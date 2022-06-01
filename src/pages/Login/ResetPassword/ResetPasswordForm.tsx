import { LockOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useResetPassword } from '../../../hooks/auth/useResetPassword.hook';
import { FormContainer, HeaderContainer, LoginLink, Logo } from '../styles';

import {
  onError,
  onExpiredLink,
  onFailMatchPassword,
  onSuccess,
} from './Toasters';

export const ResetPasswordForm = () => {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  const { form, onChange, loading, create, cleanForm } = useResetPassword();

  const onLogin = () => {
    const matchPassword = form.password === form.passwordConfirmation;
    if (!matchPassword) {
      return onFailMatchPassword();
    }

    create({ ...form, token })?.subscribe({
      next: () => {
        onSuccess();
        cleanForm();
        navigate('/login');
      },
      error: e => {
        if (e === 'Invalid or expired JWT') {
          return onExpiredLink(navigate);
        }
        onError();
      },
    });
  };

  return (
    <FormContainer onFinish={onLogin}>
      <HeaderContainer>
        <Logo src='/fulllogo-black.svg' />
        <h4>Redefinição de senha</h4>
      </HeaderContainer>

      <FormContainer.Item>
        <Typography.Paragraph>
          Seja bem-vindo, para continuar escolha sua nova senha de acesso
          <strong>Conformity Pro</strong>
        </Typography.Paragraph>
      </FormContainer.Item>

      <FormContainer.Item name='password' rules={[{ required: true }]}>
        <Input
          prefix={<LockOutlined />}
          placeholder='Escolha sua nova senha'
          name='password'
          onChange={onChange}
          value={form.password}
          type='password'
        />
      </FormContainer.Item>

      <FormContainer.Item
        name='passwordConfirmation'
        rules={[{ required: true }]}
      >
        <Input
          prefix={<LockOutlined />}
          placeholder='Repita sua nova senha'
          onChange={onChange}
          value={form.passwordConfirmation}
          name='passwordConfirmation'
          type='password'
        />
      </FormContainer.Item>

      <Button block loading={loading} htmlType='submit' type='primary'>
        Confirmar
      </Button>

      <LoginLink to='/login'>Voltar para o login</LoginLink>
    </FormContainer>
  );
};
