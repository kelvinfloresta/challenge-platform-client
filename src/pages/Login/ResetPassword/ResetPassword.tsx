import React from 'react';

import { Container, LoginAnimation } from '../styles';

import { ResetPasswordForm } from './ResetPasswordForm';

export const ResetPassword = () => {
  return (
    <Container>
      <LoginAnimation active>
        <ResetPasswordForm />
      </LoginAnimation>
    </Container>
  );
};
