import React from 'react';

import { LoginAnimation, Container } from '../styles';

import { ForgotPasswordForm } from './ForgotPasswordForm';

export const ForgotPassword = () => {
  return (
    <Container>
      <LoginAnimation active>
        <ForgotPasswordForm />
      </LoginAnimation>
    </Container>
  );
};
