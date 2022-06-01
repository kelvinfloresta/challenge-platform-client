import { useState } from 'react';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IDeleteObservable } from './IHookMaker';

export function makeUseDelete<T>(service: IDeleteObservable<T>) {
  return function useDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    function onSuccess() {
      setLoading(false);
    }

    function onError(error: any) {
      setLoading(false);
      setError(error);
      return throwError(() => error);
    }

    function del(id: T) {
      setLoading(true);
      setError(null);
      return service(id).pipe(tap(onSuccess)).pipe(catchError(onError));
    }

    return {
      del,
      deleteLoading: loading,
      deleteError: error,
    };
  };
}
