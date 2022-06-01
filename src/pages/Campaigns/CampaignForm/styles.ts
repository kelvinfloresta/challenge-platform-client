import { Card } from 'antd';
import styled from 'styled-components';

import DatePicker from '../../../components/DatePicker';

export const Footer = styled.div`
  background-color: white;
  position: sticky;
  margin-top: calc(100vh - 50px);
  height: 50px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardList = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 2rem;
  row-gap: 2rem;
  padding-right: 1.5rem;
  column-gap: 3rem;
`;

export const StyledChallengeCard = styled(Card)<{ index: number }>`
  opacity: 0;
  animation: slideCard 0.3s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${props => (props.index < 10 ? props.index * 0.05 : 0.5)}s;

  @keyframes slideCard {
    0% {
      transform: translateX(-200px);
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;

export const FieldBox = styled.div`
  width: 20%;

  @media (max-width: 750px) {
    width: 70%;
  }
`;

export const DatePickerAsText = styled(DatePicker)`
  cursor: pointer;
  input {
    cursor: pointer;
    width: 5rem;
    text-align: center;
  }
`;
