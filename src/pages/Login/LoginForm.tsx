import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input } from 'antd';
import React from 'react';

import { useLogin } from '../../hooks/auth/useLogin.hook';

import {
  FormContainer,
  HeaderContainer,
  Logo,
  AnimatedFormItem,
} from './styles';

export const LoginForm = () => {
  const {
    form,
    onChange,
    loading,
    onChangeAccessAsAdmin,
    requiredPassword,
    onLogin,
    loginAsManager,
  } = useLogin();

  return (
    <FormContainer onFinish={onLogin}>
      <HeaderContainer>
        <Logo src='/fulllogo-black.svg' />
        <h4>Faça login para continuar</h4>
      </HeaderContainer>

      <FormContainer.Item name='userName' rules={[{ required: true }]}>
        <Input
          prefix={<UserOutlined />}
          placeholder='Insira seu login'
          name='userName'
          onChange={onChange}
          value={form.userName}
        />
      </FormContainer.Item>

      <AnimatedFormItem
        name='password'
        rules={[{ required: requiredPassword || loginAsManager }]}
        hidden={!requiredPassword && !loginAsManager}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder='Insira sua senha'
          name='password'
          onChange={onChange}
          value={form.password}
        />
      </AnimatedFormItem>

      <FormContainer.Item>
        <Checkbox checked={loginAsManager} onChange={onChangeAccessAsAdmin}>
          Acessar como gestor
        </Checkbox>
      </FormContainer.Item>

      <FormContainer.Item wrapperCol={{ span: 16 }} noStyle>
        <Button loading={loading} htmlType='submit' type='primary'>
          Entrar
        </Button>
      </FormContainer.Item>
    </FormContainer>
  );
};
