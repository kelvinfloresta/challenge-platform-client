import { Button, Card } from 'antd';
import styled from 'styled-components';

export const QuizContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const ConfirmAnswer = styled(Button)`
  height: 3.125rem;
`;

export const StyledRemainingTries = styled(Card)`
  width: 90px;
  display: inline-block;
  text-align: center;
  height: fit-content;

  > .ant-card-body {
    padding: 0.625rem;
    font-size: 0.875rem;
  }

  @media (max-width: 767px) {
    margin-top: 1.5rem;
  }
`;

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  border: 0px;
  border-radius: 5px;
  background-color: rgb(24, 24, 24);
  color: rgb(240, 240, 239);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  width: fit-content;
  font-size: 1rem;
  cursor: pointer;
  margin-left: auto;
  > svg {
    margin-left: 0.5rem;
  }
`;

export const QuizHeader = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
