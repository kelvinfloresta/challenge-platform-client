import { Typography } from 'antd';
import React from 'react';

import { StyledRemainingTries } from './styles';

interface IRemainingTriesProps {
  readonly tries: number;
}

export const RemainingTries = ({ tries }: IRemainingTriesProps) => {
  const type = tries === 3 ? 'danger' : 'secondary';
  return (
    <StyledRemainingTries size='small'>
      <div>
        <Typography.Text type={type}>{tries}</Typography.Text> /{' '}
        <Typography.Text>3</Typography.Text>
      </div>
      <div>Tentativas</div>
    </StyledRemainingTries>
  );
};
