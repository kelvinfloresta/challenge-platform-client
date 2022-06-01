import styled from 'styled-components';

interface ImpdTitleIndicator {
  color?: string;
  strong?: boolean;
}

export const IndexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;

  &:last-child {
    margin-right: 0;
  }

  img {
    width: 2rem;
    margin-bottom: 0.8rem;
  }
  span {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: ${props => (props.color ? props.color : '')};
  }
`;

export const ImdpTextIndicator = styled.span<ImpdTitleIndicator>`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => (props.color ? props.color : '')};
  font-weight: ${props => (props.strong ? 'bold' : 'none')};
`;
