import { useEffect, useState } from 'react';

import { onError as errorMessage } from '../../components/Toaster';
import {
  IListUserOutput,
  IUserStatus,
  userService,
} from '../../services/User.service';
import { IMultipleLoading } from '../hookMakers/IHookMaker';

const EMPTY_ID = '';
export function useUserChangeStatus(reload: () => void) {
  const [openId, setOpenId] = useState(EMPTY_ID);
  const [loading, setLoading] = useState<IMultipleLoading>({});
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (error === null) {
      return;
    }

    errorMessage();
  }, [error]);

  function onSuccess(id: string) {
    return () => {
      setError(null);
      setLoading(loading => ({ ...loading, [id]: false }));
      setOpenId(EMPTY_ID);
      reload();
    };
  }

  function onError(id: string) {
    return (err: any) => {
      setError(err);
      setLoading(loading => ({ ...loading, [id]: false }));
    };
  }

  function onChangeStatus(user: IListUserOutput) {
    const newStatus: IUserStatus =
      user.status === 'active' ? 'suspended' : 'active';

    const newUser = { ...user, newStatus };
    setError(null);
    setLoading(loading => ({ ...loading, [user.id]: true }));
    return userService.changeStatus(newUser).subscribe({
      next: onSuccess(user.id),
      error: onError(user.id),
    });
  }

  function onOpen(id: string) {
    return () => {
      const alreadyOpen = openId !== EMPTY_ID;
      if (alreadyOpen) {
        return;
      }

      setOpenId(id);
    };
  }

  function onClose() {
    setOpenId(EMPTY_ID);
  }

  return {
    changeStatusLoading: loading,
    onChangeStatus,
    onOpen,
    onClose,
    openId,
  };
}
