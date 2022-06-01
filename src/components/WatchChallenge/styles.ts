import styled from 'styled-components';

export const WatchChallengeContainer = styled.div`
  font-size: 1rem;
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10rem;

  @media (max-width: 767px) {
    padding: 0;
    margin: 0;
  }
`;

export const WatchChallengeContent = styled.div`
  width: 100%;
`;

export const InfoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 70%;

  > button {
    height: 3.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 767px) {
    padding-bottom: 1.5rem;
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
