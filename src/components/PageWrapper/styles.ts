import { Layout } from 'antd';
import styled from 'styled-components';

interface IPageTitleProps {
  hasMargin?: boolean;
}

export const Container = styled(Layout)`
  min-height: 100vh;
  background: #f0f0ef;
`;

export const Content = styled(Layout)`
  background: #f0f0ef;
`;

export const PageContainer = styled.div`
  width: 100%;
  padding: 0px 1.2rem;
  padding-bottom: 2rem;
  background-color: #f0f0ef;
  overflow: hidden;
`;
export const PageTitle = styled.div<IPageTitleProps>`
  padding-left: 2rem;
  width: 100%;
  border-bottom: 1px solid rgba(97, 97, 97, 0.1);
  text-transform: uppercase;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;
