import { MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

import { useForgotPassword } from '../../../hooks/auth/useForgotPassword.hook';
import { FormContainer, HeaderContainer, LoginLink, Logo } from '../styles';

import { onError, onSuccess } from './Toasters';

export const ForgotPasswordForm = () => {
  const { form, onChange, loading, create } = useForgotPassword();

  const onSubmit = () => {
    create()?.subscribe({
      next: () => onSuccess(),
      error: () => onError(),
    });
  };

  return (
    <FormContainer onFinish={onSubmit}>
      <HeaderContainer>
        <Logo src='/fulllogo-black.svg' />

        <h4>Esqueci minha senha</h4>
      </HeaderContainer>

      <FormContainer.Item
        name='email'
        rules={[{ type: 'email', required: true }]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder='Insira seu e-mail'
          name='email'
          onChange={onChange}
          value={form.email}
        />
      </FormContainer.Item>

      <Button block loading={loading} htmlType='submit' type='primary'>
        Enviar
      </Button>

      <LoginLink to='/login'>Voltar para o login</LoginLink>
    </FormContainer>
  );
};
