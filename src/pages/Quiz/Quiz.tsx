import { Typography, List, Empty } from 'antd';
import React from 'react';

import PageWrapper from '../../components/PageWrapper';
import { useQuiz } from '../../hooks/campaign/campaign.hook';

import { QuizAction } from './QuizAction';
import { QuizOption } from './QuizOption';
import { RemainingTries } from './RemainingTries';
import { QuizContainer, QuizHeader } from './styles';

export interface IQuizProps {
  readonly title: string;
}

export const Quiz = () => {
  const {
    actualQuestion,
    hasTries,
    onAnswer,
    onFinalize,
    onSelectOption,
    onNextQuestion,
    hasSelectedOption,
    hasMoreQuestions,
    selectedOption,
    tries,
    canSelectOption,
    correct,
    challengesLoading,
    answerLoading,
  } = useQuiz();
  if (actualQuestion === undefined) {
    return (
      <PageWrapper loading={challengesLoading}>
        <Empty description='Desafio não encontrado' />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper loading={challengesLoading}>
      <QuizContainer>
        <QuizHeader>
          <Typography.Title level={4}>{actualQuestion.title}</Typography.Title>
          <RemainingTries tries={tries} />
        </QuizHeader>
        <List
          dataSource={actualQuestion.options}
          renderItem={(question, i) => (
            <QuizOption
              onClick={onSelectOption(i)}
              selected={selectedOption === i}
              disabled={!canSelectOption}
              title={question.title}
            />
          )}
        />

        <QuizAction
          hasSelectedOption={hasSelectedOption}
          hasTries={hasTries}
          onAnswer={onAnswer}
          answerLoading={answerLoading}
          onNextQuestion={onNextQuestion}
          hasMoreQuestions={hasMoreQuestions}
          onFinalize={onFinalize}
          correct={correct}
        />
      </QuizContainer>
    </PageWrapper>
  );
};
