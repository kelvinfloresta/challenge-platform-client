import { Observable } from 'rxjs';

export default interface IHttpRequest {
  post<TResponse, TBody = any>(
    url: string,
    body?: TBody,
    headers?: any
  ): Observable<TResponse>;
  patch<TResponse, TBody = any>(
    url: string,
    body?: TBody
  ): Observable<TResponse>;
  get<TResponse, TQuery = Record<string, any>>(
    url: string,
    options?: { readonly query: TQuery }
  ): Observable<TResponse>;
  delete<TResponse>(url: string): Observable<TResponse>;
  setToken(token: string): void;
  isAuthenticated(): boolean;
}
