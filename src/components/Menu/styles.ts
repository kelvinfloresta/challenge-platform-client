import { Menu } from 'antd';
import styled from 'styled-components';

interface LogoContainerProps {
  collapsed: boolean;
}

export const LogoContainer = styled.div<LogoContainerProps>`
  width: 100%;
  height: 60px;
  background-image: ${props =>
    props.collapsed ? 'url("/minilogo.svg")' : 'url("/whitelogo.svg")'};
  background-repeat: no-repeat;
  background-size: contain;
  margin: 20px;
`;

export const SideMenu = styled(Menu)`
  margin-top: 30px;
`;
