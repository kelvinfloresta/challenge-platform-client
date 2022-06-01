import { useCallback, useState } from 'react';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IGetObservable } from './IHookMaker';

export function makeUseGet<TElement, TFilter = undefined>(
  service: IGetObservable<TElement, TFilter>,
  filter: TFilter,
  empty: TElement
) {
  return function useList() {
    const [element, setElement] = useState<TElement>(empty);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    function onSuccess(elements: TElement) {
      setElement(elements);
      setLoading(false);
    }

    function onError(err: any) {
      setLoading(false);
      setError(err);
      return throwError(() => err);
    }

    const get = useCallback(() => {
      setLoading(true);
      setError(null);

      return service(filter).pipe(tap(onSuccess)).pipe(catchError(onError));
    }, []);

    return {
      element,
      setElement,
      get,
      loading,
      error,
    };
  };
}
