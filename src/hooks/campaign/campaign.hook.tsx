import { message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { finalize } from 'rxjs';

import { campaignService } from '../../services/Campaigns.service';
import { makeUseGet } from '../hookMakers/makeUseGet.hook';
import { makeUseList } from '../hookMakers/makeUseList.hook';

export const useGetQuestions = makeUseList(campaignService.getQuestions);
export const useGetUserIMPD = makeUseGet(
  campaignService.getUserIMPD,
  {},
  { avg: 0, companyAvg: 0 }
);

export const useDepartmentIMPDList = makeUseList(
  campaignService.listDepartmentIMPD
);

export const useListResults = makeUseList(campaignService.listResults);
export const useListCampaigns = makeUseList(campaignService.list);
export const useListCampaignUsers = makeUseList(campaignService.listUsers);

const EMPTY_OPTION = -1;

const onCorrectAnswer = () =>
  message.success(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Parabéns!
      </Typography.Title>
      <Typography.Text>Você acertou, muito bom!</Typography.Text>
    </>
  );

const onWrongAnswer = () =>
  message.warn(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Vishhh! :(
      </Typography.Title>
      <Typography.Text>Essa você errou.</Typography.Text>
    </>
  );

const onError = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Um erro ocorreu
      </Typography.Title>
      <Typography.Text>
        Por favor entre em contato caso persista
      </Typography.Text>
    </>
  );

const MAX_TRIES = 3;

export function useQuiz() {
  const [selectedOption, setSelectedOption] = useState(EMPTY_OPTION);
  const [correct, setCorrect] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [tries, setTries] = useState(0);
  const hasSelectedOption = selectedOption !== EMPTY_OPTION;
  const [actualQuestionIndex, setActualQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const { campaign_id = '', challenge_id = '' } = useParams();
  const {
    elements: questions,
    list: getChallenges,
    listLoading: challengesLoading,
  } = useGetQuestions();
  const actualQuestion = questions[actualQuestionIndex];

  function onAnswer() {
    if (!hasSelectedOption) {
      return;
    }
    if (!actualQuestion) {
      return;
    }
    const option = actualQuestion.options[selectedOption];
    if (!option) {
      return;
    }

    setAnswerLoading(true);
    const subscription = campaignService
      .answer({
        campaign_id,
        challenge_id,
        question_id: actualQuestion.id,
        option_id: option.id,
      })
      .pipe(finalize(() => setAnswerLoading(false)))
      .subscribe({
        next: ({ Correct, RemainingTries }) => {
          subscription.unsubscribe();
          setTries(MAX_TRIES - RemainingTries);
          if (Correct) {
            onCorrectAnswer();
            return setCorrect(true);
          }

          onWrongAnswer();
          setSelectedOption(EMPTY_OPTION);
        },
        error: onError,
      });
  }

  function onFinalize() {
    navigate('/finish-challenge');
  }

  useEffect(() => {
    const subscription = getChallenges({
      campaign_id,
      challenge_id,
    }).subscribe();

    return () => subscription.unsubscribe();
  }, [campaign_id, challenge_id, getChallenges]);

  useEffect(() => {
    if (!actualQuestion) {
      return;
    }

    setTries(MAX_TRIES - actualQuestion.remainingTries);
  }, [actualQuestion]);

  const hasTries = tries < MAX_TRIES;

  const canSelectOption = !correct && hasTries;

  function onSelectOption(index: number) {
    return () => {
      if (!canSelectOption) {
        return;
      }
      setSelectedOption(index);
    };
  }

  function onNextQuestion() {
    setCorrect(false);
    setSelectedOption(EMPTY_OPTION);
    setActualQuestionIndex(actualQuestionIndex + 1);
  }

  const hasMoreQuestions = actualQuestionIndex < questions.length - 1;

  return {
    onAnswer,
    onFinalize,
    hasTries,
    onSelectOption,
    challengesLoading,
    onNextQuestion,
    actualQuestion,
    hasMoreQuestions,
    hasSelectedOption,
    selectedOption,
    tries,
    canSelectOption,
    correct,
    answerLoading,
  };
}
