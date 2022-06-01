import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { config } from '../../config';
import {
  userNotFound,
  onError,
  wrongPassword,
  onRedirectSSO,
} from '../../pages/Login/LoginToaster';
import { authService } from '../../services/Auth.service';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

const _useLogin = makeUseForm(authService.login, {
  userName: '',
  password: '',
  isEmpty: true,
});

export function useLogin() {
  const navigate = useNavigate();
  const state = _useLogin();
  const [requiredPassword, setRequiredPassword] = useState(false);
  const [loginAsManager, setLoginAsManager] = useState(
    authService.acessAsAdmin()
  );

  const onChangeAccessAsAdmin = (e: CheckboxChangeEvent) => {
    authService.setAcessAsAdmin(e.target.checked);
    setLoginAsManager(e.target.checked);
  };

  function handleLoginError(error: any) {
    if (error === 'PASSWORD_REQUIRED') {
      setRequiredPassword(true);
      return;
    }

    if (error === 'Unauthorized') {
      return userNotFound();
    }

    if (error === 'WRONG_PASSWORD') {
      return wrongPassword();
    }

    if (typeof error === 'string' && error.startsWith('SSO_REQUIRED')) {
      const workspace = error.split('__')[1] || '';
      authService.setWorkspace(workspace);
      onRedirectSSO();
      window.location.href = `${config.host}/saml/${workspace}/auth`;
      return;
    }

    return onError();
  }

  const onLogin = () => {
    const password =
      loginAsManager || requiredPassword ? state.form.password : undefined;
    state.create({ ...state.form, password })?.subscribe({
      next: () => {
        navigate('/challenges');
        state.cleanForm();
      },
      error: handleLoginError,
    });
  };

  return {
    requiredPassword,
    onChangeAccessAsAdmin,
    setRequiredPassword,
    handleLoginError,
    onLogin,
    loginAsManager,
    ...state,
  };
}
