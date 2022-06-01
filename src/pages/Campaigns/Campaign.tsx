import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import { Responsive } from '../../components/Responsive';
import { useCampaignChallengeList } from '../../hooks/campaign/useCampaignChallengeList.hook';
import { IListCampaignChallengesOutput } from '../../services/Campaigns.service';
import { formatDateTime } from '../../utils/Date.util';

const columns: ColumnsType<IListCampaignChallengesOutput> = [
  {
    title: 'Título',
    dataIndex: 'Title',
  },
  { title: 'IMPD', dataIndex: 'IMPD', render: v => `${v}%` },
  {
    title: 'Data de início',
    dataIndex: 'StartDate',
    render: formatDateTime,
  },
  {
    title: 'Data de Finalização',
    dataIndex: 'EndDate',
    render: v => new Date(v).toLocaleDateString(),
  },
  {
    align: 'right',
    dataIndex: 'CampaignID',
    render: campaignId => {
      return <Link to={`/campaigns/${campaignId}`}>Visualizar</Link>;
    },
  },
];

const Campaign = () => {
  const {
    elements: campaigns,
    list: listChallenges,
    listLoading: challengesLoading,
  } = useCampaignChallengeList();
  const navigate = useNavigate();

  const goToDashboard = (input: {
    campaignId: string;
    challengeId: string;
  }) => {
    navigate(`/campaigns/${input.campaignId}/${input.challengeId}`);
  };

  const goToForm = () => {
    navigate(`/new-campaign`);
  };

  useEffect(() => {
    const sub = listChallenges({}).subscribe();
    return () => sub.unsubscribe();
  }, [listChallenges]);

  const extra = (
    <Button type='dashed' icon={<PlusOutlined />} onClick={goToForm}>
      Lançar Desafio
    </Button>
  );

  return (
    <PageWrapper loading={challengesLoading}>
      <Card title='Desafios' extra={extra}>
        <Responsive>
          <Table
            columns={columns}
            locale={{
              emptyText: <Empty description='Lista de resultados vazia.' />,
            }}
            dataSource={campaigns}
            rowKey='CampaignID'
            onRow={challenge => {
              return {
                onClick: () =>
                  goToDashboard({
                    challengeId: challenge.ID,
                    campaignId: challenge.CampaignID,
                  }),
              };
            }}
          />
        </Responsive>
      </Card>
    </PageWrapper>
  );
};

export default Campaign;
