import { Form } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: #13151b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginAnimation = styled.div<{ active: boolean }>`
  position: absolute;
  width: 530px;
  animation-name: ${props => (props.active ? 'drop' : '')};
  animation-delay: ${props => (props.active ? '0' : '0.8s')};
  animation-duration: 0.8s;
  transition: transform 0.8s;
  transform: ${props =>
    props.active ? 'translateX(0px)' : 'translateX(-150vw)'};

  @media (max-width: 767px) {
    width: 90vw;
    padding: 2rem 1rem;
    margin: 0;
  }
`;

export const FormContainer = styled(Form)`
  background: rgb(240, 242, 245);
  border-radius: 1rem;
  padding: 2.4rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 65px;
  margin-bottom: 2rem;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    h4 {
      align-self: flex-start;
    }
  }
`;

export const Logo = styled.img`
  width: 180px;
  @media (max-width: 767px) {
    width: 200px;
    margin-bottom: 2rem;
  }
`;

export const AnimatedFormItem = styled(FormContainer.Item)`
  height: 2rem;
  transition: max-height 0.6s, opacity 0.6s, margin-bottom 0.6s;
  display: block !important;
  max-height: ${props => (props.hidden ? 0 : 2)}rem;
  opacity: ${props => (props.hidden ? 0 : 1)};
  margin-bottom: ${props => (props.hidden ? 0 : 1.5)}rem;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-btn-link,
  a {
    margin-top: 1rem;
    padding: 0;
    line-height: 32px;
  }

  @media (max-width: 767px) {
    text-align: center;
    flex-direction: column;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  animation-name: fadeIn;
  animation-duration: 1.8s;
`;

export const LoginLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
`;
