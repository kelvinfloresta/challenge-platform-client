import { Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import PageWrapper from '../../../components/PageWrapper';

export const FinishNewCampaign = () => {
  return (
    <PageWrapper>
      <Result
        status='success'
        title='Campanha criada com sucesso!'
        subTitle='Uma notificação foi enviada para cada usuário desta campanha.'
        extra={[<Link to='/campaigns'>Ver campanhas</Link>]}
      />
    </PageWrapper>
  );
};
