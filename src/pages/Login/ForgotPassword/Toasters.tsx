import { message, Typography } from 'antd';
import React from 'react';

export const onSuccess = () =>
  message.success(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        E-mail enviado
      </Typography.Title>
      <Typography.Text>
        Um link de redefinição de senha foi enviado para você
      </Typography.Text>
    </>
  );

export const onError = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Falha ao recuperar senha
      </Typography.Title>
      <Typography.Text>
        Verifique seu e-mail e tente novamente, caso o problema persista
        contate-nos
      </Typography.Text>
    </>
  );
