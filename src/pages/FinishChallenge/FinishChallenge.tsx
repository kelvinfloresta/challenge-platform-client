import { Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';

export const FinishChallenge = () => {
  return (
    <PageWrapper>
      <Result
        status='success'
        title='Parabéns! Você concluiu o desafio!'
        subTitle='Fique atento às notificações e não perca o prazo dos próximos desafios.'
        extra={[<Link to='/challenges'>Ver meus desafios</Link>]}
      />
    </PageWrapper>
  );
};
