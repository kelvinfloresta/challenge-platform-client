import { Card, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Forbidden = () => {
  return (
    <Container>
      <Card>
        <Result
          status='error'
          title='Sem permissão'
          subTitle='Desculpe, você não está autorizado a acessar esta página.'
          extra={<Link to='/'>Voltar para Home</Link>}
        />
      </Card>
    </Container>
  );
};

export default Forbidden;
