import styled from 'styled-components';

export const TitleContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(97, 97, 97, 0.1);
  text-transform: uppercase;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const CampaignListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.2rem;
  justify-content: center;
  flex-direction: column;
`;

export const Grid = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;

  @media (max-width: 676px) {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
