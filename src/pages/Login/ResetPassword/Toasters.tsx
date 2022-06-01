import { Button, message, Typography } from 'antd';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

export const onFailMatchPassword = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        As senhas não coincidem
      </Typography.Title>
      <Typography.Text>Repita a senha corretamente</Typography.Text>
    </>
  );

export const onExpiredLink = (navigate: NavigateFunction) =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Link expirado
      </Typography.Title>
      <Typography.Text>
        Recupere a senha novamente{' '}
        <Button
          style={{ padding: 0 }}
          type='link'
          onClick={() => navigate('/forgot-password')}
        >
          clicando aqui
        </Button>
        . Caso persista entre em contato
      </Typography.Text>
    </>
  );

export const onError = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Falha ao alterar senha
      </Typography.Title>
      <Typography.Text>
        Tente novamente e caso o problema persista solicite uma nova redefinição
        de senha na tela de login
      </Typography.Text>
    </>
  );

export const onSuccess = () =>
  message.success(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Senha alterada com sucesso!
      </Typography.Title>
      <Typography.Text>Faça login para continuar</Typography.Text>
    </>
  );
