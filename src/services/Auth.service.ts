import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga4';
import { firstValueFrom, Observable, tap } from 'rxjs';

import httpRequest from '../adapters/HttpRequest';
import { parseJwt } from '../utils/JWT.util';

export interface ILoginInput {
  readonly userName: string;
  readonly password?: string;
}

type ILoginOutput = { token: string };

export type IUserRole = 'companyManager' | 'user';

interface IResetPasswordInput {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly token: string;
}

interface IForgotPassword {
  readonly email: string;
}

interface IUserSession {
  readonly company_id: string;
  readonly department_id: string;
  readonly exp: number;
  readonly id: string;
  readonly login: string;
  readonly name: string;
  readonly role: IUserRole;
}

function storeToken(token: string) {
  sessionStorage.setItem('token', token);
}

function setUser(token: string) {
  const session = parseJwt<IUserSession>(token);
  if (session === null) {
    throw new Error('INVALID_TOKEN');
  }

  Sentry.setUser({
    username: session.name,
    id: session.id,
  });

  ReactGA.set({
    userId: '',
    userName: '',
    companyId: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  authService.userSession = session;
}

const EMPTY_SESSION: IUserSession = {
  id: '',
  company_id: '',
  department_id: '',
  exp: 0,
  login: '',
  name: '',
  role: 'user',
};

function login(data: ILoginInput) {
  const parsedData = {
    login: data.userName,
    password: data.password,
  };

  return httpRequest.post<ILoginOutput>('/login', parsedData);
}

function loginWithoutPassword(userName: string) {
  return httpRequest.post<ILoginOutput>(`/login/${userName}`);
}

export const authService = {
  userSession: EMPTY_SESSION,
  setAcessAsAdmin(value: boolean) {
    localStorage.setItem('accessAsAdmin', String(value));
  },
  acessAsAdmin(): boolean {
    return localStorage.getItem('accessAsAdmin') === 'true';
  },
  setWorkspace(value: string) {
    localStorage.setItem('workspace', value);
  },
  getWorkspace(): string {
    return localStorage.getItem('workspace') || '';
  },
  login(input: ILoginInput): Observable<ILoginOutput> {
    const observable = input.password
      ? login(input)
      : loginWithoutPassword(input.userName);

    return observable.pipe(
      tap(result => {
        httpRequest.setToken(result.token);
        storeToken(result.token);
        setUser(result.token);
      })
    );
  },
  loginByToken(token: string) {
    setUser(token);
    httpRequest.setToken(token);
    storeToken(token);
  },
  logout() {
    httpRequest.setToken('');
    storeToken('');
    Sentry.setUser(null);

    ReactGA.set({
      userId: '',
      userName: '',
      companyId: '',
    });
  },
  restoreSession(): boolean {
    if (httpRequest.isAuthenticated()) {
      return true;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }

    httpRequest.setToken(token);
    setUser(token);

    return true;
  },
  checkWorkspace(workspace: string): Promise<boolean> {
    return firstValueFrom(
      httpRequest.get(`/saml/${workspace.toLowerCase().trim()}/check`)
    );
  },
  resetPassword(input: IResetPasswordInput): Observable<void> {
    return httpRequest.post(
      '/change-password',
      {
        password: input.password,
        passwordConfirmation: input.passwordConfirmation,
      },
      { Authorization: `Bearer ${input.token}` }
    );
  },
  forgotPassword({ email }: IForgotPassword): Observable<void> {
    return httpRequest.post<void>('/reset-password', { email });
  },
};
