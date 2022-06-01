import { useCallback, useState } from 'react';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IListObservable } from './IHookMaker';

export function makeUseList<TElement, TFilter = void>(
  service: IListObservable<TElement, TFilter>
) {
  return function useList() {
    const [elements, setElements] = useState<TElement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    function onSuccess(elements: TElement[]) {
      setElements(elements);
      setLoading(false);
    }

    function onError(error: any) {
      setLoading(false);
      setError(error);
      return throwError(() => error);
    }

    const list = useCallback((filter: TFilter) => {
      setLoading(true);
      setError(null);

      return service(filter).pipe(tap(onSuccess)).pipe(catchError(onError));
    }, []);

    return {
      elements,
      setElements,
      list,
      listLoading: loading,
      listError: error,
    };
  };
}
