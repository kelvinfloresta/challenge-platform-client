import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Select, Table, Input } from 'antd';
import _debounce from 'lodash/debounce';
import _uniqBy from 'lodash/uniqBy';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router';

import PageWrapper from '../../../components/PageWrapper';
import { Responsive } from '../../../components/Responsive';
import { onError } from '../../../components/Toaster';
import {
  useListCampaignUsers,
  useListResults,
} from '../../../hooks/campaign/campaign.hook';
import { useExportResult } from '../../../hooks/campaign/useExportResult.hook';
import {
  IListCampaignUsersOutput,
  IListResultsOutput,
} from '../../../services/Campaigns.service';

import { expandedRowRender } from './ExpandedRowRender';
import { columns } from './columns';
import { filter, IDepartmentFilter } from './filter';
import { FilterArea } from './styles';

const { Option } = Select;

const ChallengeResults = () => {
  const {
    elements: users,
    list: listUsers,
    listLoading: usersLoading,
  } = useListCampaignUsers();

  const { list: listResults, listLoading: resultsLoading } = useListResults();
  const { campaignId = '', challengeId = '' } = useParams();

  const [departmentFilter, setDepartmentFilter] =
    useState<IDepartmentFilter>(undefined);

  const [nameFilter, setNameFilter] = useState('');
  const {
    download,
    data: csv,
    loading: csvLoading,
    error: csvError,
  } = useExportResult();

  const [cachedResult, setCachedResult] = useState<
    Record<string, IListResultsOutput[]>
  >({});

  const filtered = useMemo(
    () => filter(users, departmentFilter, nameFilter),
    [departmentFilter, users, nameFilter]
  );

  const departments = useMemo(() => _uniqBy(users, 'departmentId'), [users]);

  const cleanFilter = () => {
    setDepartmentFilter(undefined);
    setNameFilter('');
  };

  const onChangeNameFilter = (ev: ChangeEvent<HTMLInputElement>) =>
    setNameFilter(ev.target.value);

  const debounceOnChangeNameFilter = useMemo(
    () => _debounce(onChangeNameFilter, 400),
    []
  );

  useEffect(() => {
    if (!campaignId || !challengeId) return;

    const sub = listUsers({ campaignId, challengeId }).subscribe();
    return () => sub.unsubscribe();
  }, [campaignId, challengeId, listUsers]);

  useEffect(() => {
    if (csvError === null) {
      return;
    }

    onError();
  }, [csvError]);

  function onList({ userId }: IListCampaignUsersOutput) {
    listResults({
      campaignId,
      challengeId,
      userId,
    }).subscribe(results => {
      setCachedResult(cached => ({ ...cached, [userId]: results }));
    });
  }

  return (
    <PageWrapper title='Campanhas'>
      <Card title='Resultados'>
        <FilterArea>
          <Input
            style={{ width: 250 }}
            placeholder='Filtrar por nome'
            onChange={debounceOnChangeNameFilter}
          />

          <Select
            onChange={setDepartmentFilter}
            placeholder='Filtrar por departamento'
            value={departmentFilter}
          >
            {departments.map(department => (
              <Option
                key={department.departmentId}
                value={department.departmentId}
              >
                {department.departmentName}
              </Option>
            ))}
          </Select>

          <Button
            type='text'
            onClick={cleanFilter}
            icon={<CloseOutlined style={{ fontSize: '0.66rem' }} />}
          >
            Limpar
          </Button>

          <CSVLink
            data={csv}
            asyncOnClick
            onClick={(_, done) => {
              download({ campaignId, challengeId }).subscribe(() => done());
              return false;
            }}
            separator=';'
            filename='resultado.csv'
          >
            <Button loading={csvLoading}>Exportar .CSV</Button>
          </CSVLink>
        </FilterArea>

        <Responsive>
          <Table
            columns={columns}
            dataSource={filtered}
            loading={usersLoading}
            locale={{
              emptyText: <Empty description='Lista de resultados vazia.' />,
            }}
            expandable={{
              expandedRowRender: expandedRowRender(
                resultsLoading,
                cachedResult
              ),
              onExpand(expanded, record) {
                if (!expanded) {
                  return;
                }

                onList(record);
              },
            }}
            rowKey='userId'
          />
        </Responsive>
      </Card>
    </PageWrapper>
  );
};

export default ChallengeResults;
