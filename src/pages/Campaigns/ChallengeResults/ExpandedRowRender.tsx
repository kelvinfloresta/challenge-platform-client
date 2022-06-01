import {
  TrophyOutlined,
  QuestionOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { Skeleton, List, Space } from 'antd';
import React from 'react';

import {
  IListCampaignUsersOutput,
  IListResultsOutput,
} from '../../../services/Campaigns.service';

import { ResultIcon } from './ResultIcon';

interface IResultDetailProps {
  readonly results: IListResultsOutput[];
  readonly loading: boolean;
}

function ResultDetail({ results, loading }: IResultDetailProps) {
  if (loading) {
    return <Skeleton />;
  }

  if (!results) {
    return <Skeleton />;
  }

  return (
    <List
      size='large'
      itemLayout='vertical'
      dataSource={results}
      bordered
      renderItem={(item, i) => (
        <List.Item
          key={i}
          actions={[
            <Space size='large' wrap>
              <ResultIcon icon={TrophyOutlined} text={`IMPD ${item.impd}%`} />
              <ResultIcon
                icon={QuestionOutlined}
                text={`Tentativas ${item.tries}/3`}
              />
              <ResultIcon
                icon={item.correct ? LikeOutlined : DislikeOutlined}
                text='Acertou'
              />
              <ResultIcon
                icon={item.finished ? LikeOutlined : DislikeOutlined}
                text='Finalizado'
              />
            </Space>,
          ]}
        >
          <List.Item.Meta title={`Pergunta ${i + 1}`} />
        </List.Item>
      )}
    />
  );
}

export const expandedRowRender =
  (loading: boolean, cachedResult: Record<string, IListResultsOutput[]>) =>
  ({ userId }: IListCampaignUsersOutput) => {
    const results = cachedResult[userId] || [];
    return <ResultDetail loading={loading} results={results} />;
  };
