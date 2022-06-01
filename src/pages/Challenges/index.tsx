import { Result } from 'antd';
import { parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import HappyFace from '../../assets/happy-face.svg';
import PageWrapper from '../../components/PageWrapper';
import WatchChallenge from '../../components/WatchChallenge';
import { useCampaignChallengeList } from '../../hooks/campaign/useCampaignChallengeList.hook';
import { authService } from '../../services/Auth.service';
import { IListCampaignChallengesOutput } from '../../services/Campaigns.service';

import CardChallenge from './CardChallenge';
import { Container, Grid } from './styles';

const Campaign = () => {
  const {
    elements: challenges,
    list: listChallenges,
    listLoading: challengesLoading,
  } = useCampaignChallengeList();

  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] =
    useState<IListCampaignChallengesOutput | null>(null);

  const closeDrawer = () => {
    setSelectedChallenge(null);
  };

  const goToQuiz = () => {
    navigate(`/quiz/${selectedChallenge?.CampaignID}/${selectedChallenge?.ID}`);
  };

  const deadlineMessage = useCallback((deadline: number | undefined) => {
    if (deadline === 0) {
      return 'Finaliza hoje';
    }

    if (deadline === 1) {
      return 'Falta 1 dia';
    }

    if (!deadline) {
      return 'Prazo indefinido';
    }

    return `Termina em ${deadline} dias`;
  }, []);

  function calculateDeadlines(finalDate: Date | null): number | undefined {
    if (!finalDate) {
      return undefined;
    }

    const currentDate = new Date();
    const parsedFinalDate = parseISO(String(finalDate));

    const diff = Math.abs(parsedFinalDate.getTime() - currentDate.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
  }

  useEffect(() => {
    const sub = listChallenges({
      userId: authService.userSession.id,
      isPending: true,
    }).subscribe();

    return () => sub.unsubscribe();
  }, [listChallenges]);

  return (
    <PageWrapper loading={challengesLoading} title='Meus desafios'>
      <WatchChallenge
        onClose={closeDrawer}
        goToQuiz={goToQuiz}
        challenge={selectedChallenge}
      />

      <Container>
        <Grid>
          {challenges.map(challenge => (
            <CardChallenge
              key={challenge.ID}
              title={challenge.Title}
              subtitle={deadlineMessage(calculateDeadlines(challenge.EndDate))}
              onClick={() => setSelectedChallenge(challenge)}
              mediaUrl={challenge.Media.Path}
            />
          ))}
        </Grid>
        {challenges.length === 0 && (
          <Result
            icon={
              <img src={HappyFace} alt='Happy Icon' width={75} height={75} />
            }
            title='Não há desafios pendentes no momento!'
            subTitle='Volte em breve'
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export default Campaign;
