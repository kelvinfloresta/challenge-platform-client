import { Observable } from 'rxjs';

export interface IPaginate<T> {
  readonly data: readonly T[];
  readonly maxPages: number;
}

export interface IPaginateInput {
  readonly pageSize: number;
  readonly actualPage: number;
}

export type IPaginateObservable<
  TOutput,
  TInput extends IPaginateInput = IPaginateInput
> = (param: TInput) => Observable<IPaginate<TOutput>>;

export type ICreateObservable<TInput, TOutput> = (
  param: TInput
) => Observable<TOutput>;

export type IDeleteObservable<TInput> = (param: TInput) => Observable<never>;

export type IListObservable<TList, TFilter> = (
  param: TFilter
) => Observable<TList[]>;

export type IGetObservable<TElement, TFilter> = (
  param: TFilter
) => Observable<TElement>;

export type IPatchObservable<TFilter, TData> = (
  filter: TFilter,
  data: TData
) => Observable<never>;

export type IMultipleLoading = { [id: string]: boolean | undefined };
