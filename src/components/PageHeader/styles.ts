import { QuestionCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 2rem 3rem 0px 0px;
  height: 8rem;
  width: 100%;
  background: rgb(240, 240, 239);

  @media (max-width: 767px) {
    padding: 1rem 1rem;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DataContainer = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
`;

export const IMPDIcon = styled.img`
  width: 2.5rem;
  margin-right: 0.6rem;
  @media (max-width: 767px) {
    width: 2.2rem;
  }
`;

export const ImpdContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  margin-right: 0.8rem;

  strong {
    font-weight: 600;
    font-size: 1rem;
    color: ${props => props.color};
  }

  svg {
    margin-left: 0.2rem;
  }

  span {
    font-size: 0.86rem;
    font-weight: 300;
  }

  @media (max-width: 767px) {
    span {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 400px) {
    svg {
      display: none;
    }
  }
`;

export const AboutImpdTitle = styled.p`
  font-weight: 500;
  color: rgb(232, 54, 54);
`;

export const Subtitle = styled.span`
  font-weight: 400;
`;

export const PersonalDataContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.6rem;
`;

export const AvatarContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  background-color: #333333;
  border: 1px solid rgb(232, 54, 54);
  display: flex;
  margin-right: 0.6rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  @media (max-width: 767px) {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    margin-right: 0;
  }

  @media (max-width: 400px) {
    width: 2.2.rem;
  }
`;

export const DisplayName = styled(Typography.Text)`
  color: rgb(232, 54, 54);
  width: 7.2rem;
  font-size: 1.2rem;

  @media (max-width: 767px) {
    width: 3rem;
    display: none;
    margin-left: 0.2rem;
  }

  @media (max-width: 400px) {
    display: none !important;
  }
`;

export const CustomPopover = styled(Popover)`
  display: flex !important;
`;

export const QuestionCircle = styled(QuestionCircleOutlined)`
  font-size: 20;
  color: 'rgb(117, 117, 117)';
`;

export const LogoutOutline = styled(PoweroffOutlined)`
  font-size: 2rem;
  align-self: center;
  margin-left: 2rem;
  transition: opacity 0.3s;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }

  :hover {
    opacity: 0.7;
  }
`;

export const ImpdData = styled.div`
  margin-bottom: 0.16rem;
`;
