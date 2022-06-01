import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authService, IUserRole } from '../services/Auth.service';

interface IAuthRouteProps {
  readonly userRole?: IUserRole;
}

export const AuthRoute = ({ userRole }: IAuthRouteProps) => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send('pageview');
  }, [location]);

  if (!authService.restoreSession()) {
    return <Navigate to='/login' />;
  }

  if (userRole && authService.userSession.role !== userRole) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
