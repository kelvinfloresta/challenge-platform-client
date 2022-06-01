import { message } from 'antd';
import { useEffect, useState } from 'react';
import { throwError, tap, catchError } from 'rxjs';

import { onError } from '../../components/Toaster';
import { IUserFormInstance } from '../../pages/Manager/Users/UserForm';
import { userService } from '../../services/User.service';
import { isEdit } from '../../utils/Edit.util';
import { useDepartmentList } from '../department/useDepartmentList.hook';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

const _useUserForm = makeUseForm<IUserFormInstance, string>(
  userService.create,
  {
    name: '',
    departmentId: '',
    email: '',
    loginWith: 'email',
    document: '',
    jobPosition: '',
    phone: '',
    role: 'user',
    isEmpty: true,
  }
);

export const useUserForm = () => {
  const state = _useUserForm();
  const department = useDepartmentList();
  const { list } = department;
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!openForm) {
      return;
    }

    const sub = list().subscribe();

    return () => sub.unsubscribe();
  }, [list, openForm]);

  function handleOpenForm(open: boolean) {
    return () => setOpenForm(open);
  }

  function onSuccess() {
    message.success('Usuário atualizado com sucesso');
    setOpenForm(false);
    setLoading(false);
  }

  const handleError = (err: any) => {
    setLoading(false);
    onError();
    return throwError(() => err);
  };

  const edit = (data: IUserFormInstance & { readonly id: string }) => {
    setLoading(true);

    return userService
      .patch(data)
      .pipe(tap(onSuccess))
      .pipe(catchError(handleError));
  };

  function parsePhone(phone: string) {
    if (!phone) {
      return '';
    }

    const onlyDigits = String(phone).replace(/\D/g, '');
    return `+55${onlyDigits}`;
  }

  const parseForm = (form: IUserFormInstance) => {
    const phone = parsePhone(form.phone);
    const document = String(form.document).replace(/\D/g, '');

    if (form.loginWith === 'email') {
      return { ...form, phone, document: '', loginWith: undefined };
    }

    return { ...form, phone, document, email: '', loginWith: undefined };
  };

  const onSubmit = (form: IUserFormInstance) => {
    const parsedForm = parseForm(form);

    if (isEdit(parsedForm)) {
      return edit(parsedForm);
    }

    return state.create(parsedForm)?.pipe(
      tap(() => {
        message.success('Usuário criado com sucesso');
        setOpenForm(false);
      })
    );
  };

  const onEdit = (element: IUserFormInstance) => {
    setOpenForm(true);
    state.setForm({ ...element, phone: element.phone.substring(3) });
  };

  return {
    ...state,
    department,
    openForm,
    handleOpenForm,
    setOpenForm,
    onSubmit,
    onEdit,
    loading: state.loading || loading,
  };
};
