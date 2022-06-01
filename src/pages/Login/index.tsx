import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { authService } from '../../services/Auth.service';
import { FAQ } from '../FAQ/FAQ';

import { LoginForm } from './LoginForm';
import { SSOForm } from './SSOForm';
import { Bottom, Container, LoginAnimation } from './styles';

const Login = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [workspace, setWorkspace] = useState(authService.getWorkspace());
  const showSSO = workspace !== '';

  const cleanWorkspace = () => {
    setWorkspace('');
    authService.setWorkspace('');
  };

  return (
    <Container>
      <Drawer onClose={() => setShowFAQ(false)} visible={showFAQ}>
        <FAQ />
      </Drawer>

      <LoginAnimation active={!showSSO}>
        <LoginForm />
        <Bottom>
          <Button type='link' onClick={() => setShowFAQ(true)}>
            Precisa de ajuda?
          </Button>

          <Link to='/forgot-password'>Esqueceu a senha?</Link>
        </Bottom>
      </LoginAnimation>

      <LoginAnimation active={showSSO}>
        <SSOForm onShowLogin={cleanWorkspace} workspace={workspace} />
        <Bottom>
          <Button type='link' onClick={() => setShowFAQ(true)}>
            Precisa de ajuda?
          </Button>

          <Link to='/forgot-password'>Esqueceu a senha?</Link>
        </Bottom>
      </LoginAnimation>
    </Container>
  );
};

export default Login;
