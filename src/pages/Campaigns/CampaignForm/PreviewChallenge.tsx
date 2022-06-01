import React from 'react';

import { IListChallengesOutput } from '../../../services/Challenge.service';
import {
  ChallengeTitle,
  WatchChallengeContainer,
  Player,
  VideoDescription,
  TextBox,
} from '../styles';

interface IChallengePreviewProps {
  readonly challenge: IListChallengesOutput | null;
}

const PreviewChallenge = ({ challenge }: IChallengePreviewProps) => {
  return (
    <WatchChallengeContainer>
      <TextBox>
        <ChallengeTitle>{challenge?.title}</ChallengeTitle>
        <VideoDescription>{challenge?.description}</VideoDescription>
      </TextBox>

      <Player
        src={challenge?.media}
        title={challenge?.title}
        frameBorder='0'
        allowFullScreen
      />
    </WatchChallengeContainer>
  );
};

export default PreviewChallenge;
