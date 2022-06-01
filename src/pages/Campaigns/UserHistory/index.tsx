import {
  DislikeOutlined,
  LikeOutlined,
  PlayCircleTwoTone,
  QuestionOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Drawer, Empty, List, Skeleton, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import PageWrapper from '../../../components/PageWrapper';
import { Responsive } from '../../../components/Responsive';
import { Player } from '../../../components/WatchChallenge/styles';
import { useListResults } from '../../../hooks/campaign/campaign.hook';
import { useCampaignChallengeList } from '../../../hooks/campaign/useCampaignChallengeList.hook';
import { authService } from '../../../services/Auth.service';
import {
  IListCampaignChallengesOutput,
  IListResultsOutput,
} from '../../../services/Campaigns.service';
import { formatDate } from '../../../utils/Date.util';

const { Column } = Table;

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: any;
  text: React.ReactNode;
  onClick?: () => void;
}) => (
  <Space
    style={{ cursor: onClick && 'pointer', userSelect: 'none' }}
    onClick={onClick}
  >
    {React.createElement(icon)}
    {text}
  </Space>
);

const UserHistory = () => {
  const [media, setMedia] = useState('');
  const {
    elements: challenges,
    list: listChallenges,
    listLoading: challengesLoading,
  } = useCampaignChallengeList();

  const { list: listResults, listLoading: resultsLoading } = useListResults();

  const [cachedResult, setCachedResult] = useState<
    Record<string, IListResultsOutput[]>
  >({});

  useEffect(() => {
    const sub = listChallenges({
      isPending: false,
      userId: authService.userSession.id,
    }).subscribe();
    return () => sub.unsubscribe();
  }, [listChallenges]);

  function onList({ ID, CampaignID }: IListCampaignChallengesOutput) {
    listResults({
      campaignId: CampaignID,
      challengeId: ID,
      userId: authService.userSession.id,
    }).subscribe(results => {
      const key = `${ID}|${CampaignID}`;
      setCachedResult(cached => ({ ...cached, [key]: results }));
    });
  }

  function expandedRowRender({
    ID,
    CampaignID,
  }: IListCampaignChallengesOutput) {
    if (resultsLoading) {
      return <Skeleton />;
    }
    const key = `${ID}|${CampaignID}`;
    if (!cachedResult[key]) {
      return <Skeleton />;
    }

    return (
      <List
        size='large'
        itemLayout='vertical'
        dataSource={cachedResult[key]}
        bordered
        renderItem={(item, i) => (
          <List.Item
            key={i}
            actions={[
              <Space size='large' wrap>
                <IconText icon={TrophyOutlined} text={`IMPD ${item.impd}%`} />
                <IconText
                  icon={QuestionOutlined}
                  text={`Tentativas ${item.tries}/3`}
                />
                <IconText
                  icon={item.correct ? LikeOutlined : DislikeOutlined}
                  text='Acertou'
                />
                <IconText
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

  return (
    <PageWrapper loading={challengesLoading} title='Meu Histórico'>
      <Responsive>
        <Table
          locale={{
            emptyText: <Empty description='Lista de histórico vazia.' />,
          }}
          dataSource={challenges}
          rowKey={record => record.CampaignID + record.ID}
          expandable={{
            expandedRowRender,
            onExpand(expanded, record) {
              if (!expanded) {
                return;
              }

              onList(record);
            },
          }}
        >
          <Column title='Desafio' dataIndex='Title' />

          <Column title='IMPD' dataIndex='IMPD' render={v => `${v}%`} />

          <Column
            title='Date de início'
            dataIndex='StartDate'
            responsive={['md']}
            render={formatDate}
          />

          <Column
            title='Date de encerramento'
            dataIndex='EndDate'
            responsive={['md']}
            render={formatDate}
          />
          <Column
            title='Assistir'
            className='action-button'
            render={record => (
              <PlayCircleTwoTone
                onClick={() => setMedia(record.Media.Path)}
                twoToneColor='#ff7875'
              />
            )}
          />
        </Table>
      </Responsive>

      <Drawer size='large' visible={media !== ''} onClose={() => setMedia('')}>
        <Player src={media} frameBorder='0' allowFullScreen />
      </Drawer>
    </PageWrapper>
  );
};

export default UserHistory;
