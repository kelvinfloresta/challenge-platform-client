import { Layout } from 'antd';
import styled from 'styled-components';

export const CardContainer = styled(Layout)`
  width: 250px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;

  transition: filter 0.3s ease-in;
  filter: grayscale(100%);
  :hover {
    filter: grayscale(0%);
  }
`;

export const ChallengeThumb = styled.img`
  height: 8rem;
  background-color: #f0f2f5;
`;

export const Content = styled.div`
  height: 5.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  * {
    white-space: normal;

    div > div {
      max-height: 3.4rem;
    }
  }
`;
