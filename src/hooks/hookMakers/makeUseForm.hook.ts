import { useState } from 'react';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IEmpty, isEmpty } from '../../utils/Empty.util';

import { ICreateObservable } from './IHookMaker';

export interface ChangeEvent {
  target: {
    name: string;
    value?: string | number;
    checked?: boolean;
    type?: 'checkbox' | string;
  };
}

export function makeUseForm<TInput, TOutput>(
  save: ICreateObservable<TInput, TOutput>,
  empty: IEmpty<TInput>
) {
  return function useForm() {
    const [form, setForm] = useState<TInput | IEmpty<TInput>>(empty);
    const [result, setResult] = useState<TOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    function onSuccess(output: TOutput) {
      setResult(output);
      setLoading(false);
    }

    const onError = (err: any) => {
      setLoading(false);
      setError(err);
      return throwError(err);
    };

    const cleanForm = () => {
      setForm(empty);
    };

    const create = (data = form) => {
      if (isEmpty(data)) {
        return;
      }

      setLoading(true);
      setError(null);
      setResult(null);

      return save(data).pipe(tap(onSuccess)).pipe(catchError(onError));
    };

    function onChange(e: ChangeEvent) {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      const newValues = { ...form, [name]: newValue, isEmpty: undefined };
      setForm(newValues);
    }

    return {
      form,
      result,
      onChange,
      create,
      loading,
      error,
      cleanForm,
      setForm,
    };
  };
}
