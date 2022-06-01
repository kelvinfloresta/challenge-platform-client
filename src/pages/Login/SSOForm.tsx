import { Button } from 'antd';
import React, { useState } from 'react';

import { config } from '../../config';
import { authService } from '../../services/Auth.service';
import { to } from '../../utils/Async.util';

import { onWorkspaceNotFound, onRedirectSSO, onError } from './LoginToaster';
import { FormContainer, HeaderContainer, Logo } from './styles';

interface ILoginSSOProps {
  readonly workspace: string;
  onShowLogin(): void;
}

export const SSOForm = ({ onShowLogin, workspace }: ILoginSSOProps) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!workspace) {
      return;
    }

    setLoading(true);
    const [error, found] = await to(authService.checkWorkspace(workspace));
    setLoading(false);

    if (error === 'Unauthorized') {
      return onWorkspaceNotFound();
    }

    if (error !== null) {
      return onError();
    }

    if (!found) {
      return onWorkspaceNotFound();
    }

    onRedirectSSO();
    window.location.href = `${config.host}/saml/${workspace}/auth`;
  };

  return (
    <FormContainer onFinish={onSubmit}>
      <HeaderContainer>
        <Logo src='/fulllogo-black.svg' />
        <h4>Faça login para continuar</h4>
      </HeaderContainer>

      <FormContainer.Item>
        <Button
          block
          loading={loading}
          style={{ marginTop: '1rem' }}
          type='primary'
          htmlType='submit'
        >
          Entrar com @{workspace}
        </Button>
      </FormContainer.Item>

      <Button type='link' onClick={onShowLogin} block>
        Voltar para home
      </Button>
    </FormContainer>
  );
};
