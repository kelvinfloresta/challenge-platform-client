import { useCallback, useState } from 'react';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IPaginate, IPaginateObservable } from './IHookMaker';

export function makeUsePaginate<TResult>(
  service: IPaginateObservable<TResult>
) {
  return function usePaginate() {
    const [elements, setElements] = useState<readonly TResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [actualPage, setActualPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    function onSuccess(elements: IPaginate<TResult>, pageSize: number) {
      setElements(elements.data);
      setTotal(elements.maxPages * pageSize);
      setLoading(false);
    }

    function onError(error: any) {
      setLoading(false);
      setError(error);
      return throwError(() => error);
    }

    const list = useCallback(
      (
        filter?: Omit<
          Parameters<typeof service>[number],
          'actualPage' | 'pageSize'
        >
      ) => {
        setLoading(true);
        setError(null);

        return service({ actualPage, pageSize, ...filter })
          .pipe(tap(result => onSuccess(result, pageSize)))
          .pipe(catchError(onError));
      },
      [actualPage, pageSize]
    );

    function onChangePage(page: number, pageSize: number) {
      setActualPage(page - 1);
      setPageSize(pageSize);
    }

    return {
      elements,
      setElements,
      list,
      listLoading: loading,
      listError: error,
      actualPage: actualPage + 1,
      pageSize,
      total,
      onChangePage,
    };
  };
}
