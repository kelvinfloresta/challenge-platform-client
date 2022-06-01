import { Result } from 'antd';
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { authService } from '../../services/Auth.service';

const LoginByToken = () => {
  const { token } = useParams();

  if (!token) {
    return <Result status={404} />;
  }

  try {
    authService.loginByToken(token);
  } catch (error: any) {
    if (error.message === 'INVALID_TOKEN') {
      return <Navigate to='/forbidden' />;
    }

    throw error;
  }

  return <Navigate to='/challenges' />;
};

export default LoginByToken;
