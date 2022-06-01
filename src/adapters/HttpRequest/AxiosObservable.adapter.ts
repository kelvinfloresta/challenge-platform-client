import AxiosObservable from 'axios-observable';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import IHttpRequest from './IHttpRequest.adapter';

export default class AxiosObservableAdapter implements IHttpRequest {
  httpRequest: AxiosObservable;

  constructor(baseURL: string) {
    this.httpRequest = AxiosObservable.create({
      baseURL,
    });
  }

  isAuthenticated(): boolean {
    return this.httpRequest.defaults.headers.Authorization?.length > 0;
  }

  setToken(token: string): void {
    if (token) {
      this.httpRequest.defaults.headers.Authorization = `Bearer ${token}`;
      return;
    }

    this.httpRequest.defaults.headers.Authorization = '';
  }

  onError(error: any) {
    if (error?.response?.data) {
      return throwError(() => error.response.data);
    }
    return throwError(() => error);
  }

  post<TResponse, TBody>(url: string, data?: TBody, headers?: any) {
    return this.httpRequest
      .post<TResponse>(url, data, { headers })
      .pipe(map(response => response.data))
      .pipe(catchError(this.onError));
  }

  patch<TResponse, TBody>(url: string, data?: TBody) {
    return this.httpRequest
      .patch<TResponse>(url, data)
      .pipe(map(response => response.data))
      .pipe(catchError(this.onError));
  }

  get<T, TQuery>(url: string, options?: { readonly query: TQuery }) {
    return this.httpRequest
      .get<T>(url, { params: options?.query })
      .pipe(map(response => response.data))
      .pipe(catchError(this.onError));
  }

  delete<TResponse>(url: string): Observable<TResponse> {
    return this.httpRequest
      .delete<TResponse>(url)
      .pipe(map(response => response.data))
      .pipe(catchError(this.onError));
  }
}
