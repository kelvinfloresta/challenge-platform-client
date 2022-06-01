import { Card, Result } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Container } from './styles';

function parseErrorDetails(error: any): {
  title: string;
  subTitle: React.ReactNode;
} {
  if (
    error === 'MISSING_EMAIL' ||
    error === 'USER_WITHOUT_DEPARTMENT' ||
    error === 'COMPANY_NOT_FOUND'
  ) {
    return {
      title: 'Falha na integração',
      subTitle: (
        <>
          O sua empresa não retornou todas as informações necessárias, <br />{' '}
          por favor verifique as configurações junto com o seu departamento de
          T.I
        </>
      ),
    };
  }

  return {
    title: 'Um erro ocorreu',
    subTitle: 'Por favor entre em contato caso persista',
  };
}

const SSOError = () => {
  const { error = '' } = useParams();

  const { title, subTitle } = parseErrorDetails(error);
  return (
    <Container>
      <Card>
        <Result
          status='error'
          title={title}
          subTitle={subTitle}
          extra={<Link to='/'>Voltar para Home</Link>}
        />
      </Card>
    </Container>
  );
};

export default SSOError;
