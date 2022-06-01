import styled from 'styled-components';

export const WatchChallengeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 10rem;

  @media (max-width: 767px) {
    padding: 0;
    margin: 0;
  }
`;

export const TextBox = styled.div`
  backdrop-filter: red;
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
`;

export const ChallengeTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const VideoDescription = styled.span`
  font-size: 1rem;
  margin-top: 0.4rem;
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

export const Player = styled.iframe`
  width: 100%;
  border-radius: 0.8rem;
  background-color: black;
  height: 65vh;
  padding: 0.2rem 0;
  @media (max-width: 767px) {
    height: 250px;
    padding-bottom: 1rem;
  }
`;
