import React from 'react';

import { ConfirmAnswer, NextButton } from './styles';

interface IQuizActionProps {
  onAnswer: () => void;
  onNextQuestion: () => void;
  onFinalize: () => void;
  readonly hasSelectedOption: boolean;
  readonly correct: boolean;
  readonly hasTries: boolean;
  readonly hasMoreQuestions: boolean;
  readonly answerLoading: boolean;
}

export const QuizAction = ({
  onAnswer,
  correct,
  hasTries,
  hasSelectedOption,
  hasMoreQuestions,
  onNextQuestion,
  onFinalize,
  answerLoading,
}: IQuizActionProps) => {
  const showNext = (correct || !hasTries) && hasMoreQuestions;
  const showConfirm = !correct && hasTries && hasSelectedOption;
  const showFinalize = (correct || !hasTries) && !hasMoreQuestions;

  return (
    <>
      {!showNext && !showFinalize && (
        <ConfirmAnswer
          onClick={onAnswer}
          disabled={!showConfirm}
          type='primary'
          loading={answerLoading}
        >
          Confirmar resposta
        </ConfirmAnswer>
      )}

      {showNext && (
        <NextButton onClick={onNextQuestion}>Próxima Questão</NextButton>
      )}

      {showFinalize && <NextButton onClick={onFinalize}>Finalizar</NextButton>}
    </>
  );
};
