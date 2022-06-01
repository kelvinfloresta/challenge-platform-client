import styled from 'styled-components';

export const FilterArea = styled.div`
  margin-top: -0.8rem;
  margin-bottom: 0.8rem;
  display: flex;
  gap: 0.4rem;

  div {
    width: 14rem;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;
