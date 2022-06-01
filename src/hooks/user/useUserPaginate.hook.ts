import { useEffect, useState } from 'react';

import { IPaginateUserInput, userService } from '../../services/User.service';
import { ChangeEvent } from '../hookMakers/makeUseForm.hook';
import { makeUsePaginate } from '../hookMakers/makeUsePaginate.hook';

const _useUserPaginate = makeUsePaginate(userService.paginate);

type IPaginateUserFilter = Omit<IPaginateUserInput, 'actualPage' | 'pageSize'>;
const INITIAL_FILTER = {};

export function useUserPaginate() {
  const state = _useUserPaginate();
  const [filter, setFilter] = useState<IPaginateUserFilter>(INITIAL_FILTER);
  const { list } = state;

  function onChangeFilter(e: ChangeEvent) {
    const { value, name } = e.target;
    setFilter(filter => ({ ...filter, [name]: value }));
  }

  useEffect(() => {
    const sub = list(filter).subscribe();
    return () => sub.unsubscribe();
  }, [filter, list]);

  function reload() {
    state.list().subscribe();
  }

  function cleanFilter() {
    setFilter(() => INITIAL_FILTER);
  }

  return {
    ...state,
    reload,
    onChangeFilter,
    filter,
    cleanFilter,
  };
}
