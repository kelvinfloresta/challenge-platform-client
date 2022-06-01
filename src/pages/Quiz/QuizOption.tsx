import React from 'react';
import styled from 'styled-components';

interface IOptionProps {
  readonly selected?: boolean;
  readonly disabled?: boolean;
}

export const Option = styled.div<IOptionProps>`
  display: flex;
  align-items: center;
  padding: 1.2rem 2rem;
  background-color: #fff;
  margin-bottom: 0.6rem;
  border-radius: 0.5rem;
  min-width: 250px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => props.selected && 'rgba(0, 0, 0, 0.85)'};
  color: ${props => props.selected && '#fff'};
  font-weight: ${props => props.selected && 'bold'};
  transition: background-color ease-out 0.3s, color ease-out 0.3s,
    transform 0.3s;

  @media (min-width: 767px) {
    transform: ${props => props.selected && 'translateX(32px)'};
    min-width: 50vw;
  }
`;

interface IQuizOptionProps {
  readonly title: string;
  readonly onClick: () => void;
  readonly selected?: boolean;
  readonly disabled?: boolean;
}

export const QuizOption = ({
  onClick,
  selected,
  disabled,
  title,
}: IQuizOptionProps) => {
  return (
    <Option onClick={onClick} selected={selected} disabled={disabled}>
      {title}
    </Option>
  );
};
