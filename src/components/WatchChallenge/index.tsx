import { PlayCircleFilled } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import React from 'react';

import { IListCampaignChallengesOutput } from '../../services/Campaigns.service';

import {
  ChallengeTitle,
  WatchChallengeContainer,
  InfoContent,
  Player,
  WatchChallengeContent,
  VideoDescription,
  TextBox,
} from './styles';

interface IChallengeMediaProps {
  readonly challenge: IListCampaignChallengesOutput | null;
  readonly onClose: () => void;
  readonly goToQuiz: () => void;
}

const WatchChallenge = ({
  challenge,
  goToQuiz,
  onClose,
}: IChallengeMediaProps) => {
  return (
    <Drawer
      headerStyle={{
        backgroundColor: '#f0f0ef',
        borderRadius: 0,
        paddingTop: '2rem',
      }}
      bodyStyle={{ backgroundColor: '#f0f0ef' }}
      width='100vw'
      onClose={onClose}
      visible={challenge !== null}
      closeIcon={<span>VOLTAR</span>}
    >
      <WatchChallengeContainer>
        <WatchChallengeContent>
          <TextBox>
            <ChallengeTitle>{challenge?.Title}</ChallengeTitle>
            <VideoDescription>{challenge?.Media.Description}</VideoDescription>
          </TextBox>

          <Player
            src={challenge?.Media.Path}
            title={challenge?.Media.Title}
            frameBorder='0'
            allowFullScreen
          />

          <InfoContent>
            <Button
              size='large'
              type='primary'
              onClick={goToQuiz}
              icon={<PlayCircleFilled style={{ fontSize: '1.4rem' }} />}
            >
              Responder desafio agora
            </Button>
          </InfoContent>
        </WatchChallengeContent>
      </WatchChallengeContainer>
    </Drawer>
  );
};

export default WatchChallenge;
