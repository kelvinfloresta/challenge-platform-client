import { message, Typography } from 'antd';
import React from 'react';

export const onWorkspaceNotFound = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Workspace não encontrado
      </Typography.Title>
      <Typography.Text>Verifique os dados e tente novamente</Typography.Text>
    </>
  );

export const onError = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Um erro ocorreu
      </Typography.Title>
      <Typography.Text>
        Por favor entre em contato caso persista
      </Typography.Text>
    </>
  );

export const onRedirectSSO = () =>
  message.loading(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Aguarde
      </Typography.Title>
      <Typography.Text>Estamos redirecionando o login</Typography.Text>
    </>,
    10
  );

export const wrongPassword = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Senha inválida
      </Typography.Title>
      <Typography.Text>Verifique os dados e tente novamente</Typography.Text>
    </>
  );

export const userNotFound = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Usuário não encontrado
      </Typography.Title>
      <Typography.Text>Verifique os dados e tente novamente</Typography.Text>
    </>
  );

export const onFailLoginWithPassword = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Falha na autenticação
      </Typography.Title>
      <Typography.Text>Verifique os dados e tente novamente</Typography.Text>
    </>
  );

export const onRequiredPassword = () =>
  message.success(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Usuário encontrado
      </Typography.Title>
      <Typography.Text>Insira sua senha para continuar</Typography.Text>
    </>
  );
