import { Spin } from 'antd';
import React from 'react';

import SideMenu from '../Menu';
import PageHeader from '../PageHeader';

import { PageContainer, Container, Content, PageTitle } from './styles';

interface IPageWrapper {
  readonly title?: string;
  readonly loading?: boolean;
}

const PageWrapper: React.FC<IPageWrapper> = ({ title, loading, children }) => {
  return (
    <Container>
      <SideMenu />
      <Content>
        <PageHeader />
        <PageTitle>{title}</PageTitle>
        <PageContainer>
          {!loading && children}
          {loading && <Spin spinning />}
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PageWrapper;
