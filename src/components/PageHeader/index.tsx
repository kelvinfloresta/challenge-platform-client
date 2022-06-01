import { Popover, Spin } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { IMPDContext } from '../../hooks/campaign/impd.context';
import { authService } from '../../services/Auth.service';
import { getIMPDColor, getIMPDSVG } from '../../utils/IMPD.util';
import ImdpDisplay from '../ImdpDisplay';

import ImpdInfo from './ImpdInfo';
import {
  HeaderContainer,
  ProfileContainer,
  PersonalDataContainer,
  AvatarContainer,
  DisplayName,
  LogoutOutline,
  CustomPopover,
  DataContainer,
  IMPDIcon,
  ImpdContainer,
  QuestionCircle,
  ImpdData,
} from './styles';

function getUserInitials(userName: string) {
  const parsedName = userName.trim();
  if (!parsedName) {
    return '';
  }

  const [firstName = '', lastName = ''] = parsedName.split(' ');
  if (!lastName) {
    return (firstName[0] || '').toUpperCase();
  }

  return (firstName[0] || '').toUpperCase() + (lastName[0] || '').toUpperCase();
}

const PageHeader: React.FC = () => {
  const {
    element,
    loading: impdLoading,
    get: getImpd,
  } = useContext(IMPDContext);
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/');
  };

  useEffect(() => {
    const sub = getImpd().subscribe();
    return () => sub.unsubscribe();
  }, [getImpd]);

  const initials = useMemo(() => {
    return getUserInitials(authService.userSession.name);
  }, []);

  const { avg, companyAvg } = element;

  return (
    <HeaderContainer>
      <ProfileContainer>
        <Spin spinning={impdLoading}>
          <CustomPopover
            placement='bottom'
            content={<ImdpDisplay impd={avg} companyImpd={companyAvg} />}
          >
            <DataContainer>
              <IMPDIcon src={getIMPDSVG(avg)} />
              <ImpdContainer color={getIMPDColor(avg)}>
                <ImpdData>
                  <strong>{avg}% </strong>
                  <Popover
                    content={ImpdInfo}
                    overlayInnerStyle={{ maxWidth: 250 }}
                    trigger='click'
                  >
                    <QuestionCircle />
                  </Popover>
                </ImpdData>

                <span>MEU IMPD</span>
              </ImpdContainer>
            </DataContainer>
          </CustomPopover>
        </Spin>

        <PersonalDataContainer>
          <AvatarContainer>{initials}</AvatarContainer>
          <DisplayName ellipsis={{ tooltip: authService.userSession.name }}>
            {authService.userSession.name}
          </DisplayName>
          <LogoutOutline title='Sair' onClick={logout} />
        </PersonalDataContainer>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default PageHeader;
