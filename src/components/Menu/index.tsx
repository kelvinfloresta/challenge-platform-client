import {
  ReadOutlined,
  QuestionCircleOutlined,
  DashboardOutlined,
  HistoryOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { authService } from '../../services/Auth.service';

import { LogoContainer, SideMenu } from './styles';

const { Sider } = Layout;

const Menu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation();

  return (
    <Sider
      width={300}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <LogoContainer collapsed={collapsed} />
      <SideMenu selectedKeys={[pathname]} theme='dark' mode='inline'>
        {authService.userSession.role === 'companyManager' && (
          <SideMenu.Item key='/dashboard' icon={<DashboardOutlined />}>
            <Link to='/dashboard'>Dashboard</Link>
          </SideMenu.Item>
        )}
        {authService.userSession.role === 'companyManager' && (
          <SideMenu.Item key='/campaigns' icon={<CalendarOutlined />}>
            <Link to='/campaigns'>Campanhas</Link>
          </SideMenu.Item>
        )}
        {authService.userSession.role === 'companyManager' && (
          <SideMenu.Item key='/users' icon={<UserOutlined />}>
            <Link to='/users'>Usuários</Link>
          </SideMenu.Item>
        )}
        {authService.userSession.role === 'companyManager' && (
          <SideMenu.Item key='/departments' icon={<TeamOutlined />}>
            <Link to='/departments'>Departamentos</Link>
          </SideMenu.Item>
        )}
        <SideMenu.Item key='/challenges' icon={<ReadOutlined />}>
          <Link to='/challenges'>Desafios</Link>
        </SideMenu.Item>
        <SideMenu.Item key='/history' icon={<HistoryOutlined />}>
          <Link to='/history'>Histórico</Link>
        </SideMenu.Item>
        <SideMenu.Item key='/faq' icon={<QuestionCircleOutlined />}>
          <Link to='/faq'>FAQ</Link>
        </SideMenu.Item>
      </SideMenu>
    </Sider>
  );
};

export default Menu;
