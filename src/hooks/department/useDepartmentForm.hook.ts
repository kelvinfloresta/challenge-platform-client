import { message } from 'antd';
import { useState } from 'react';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { onError } from '../../components/Toaster';
import { IDepartmentFormInstance } from '../../pages/Manager/Departments/DepartmentForm';
import { departmentService } from '../../services/Department.service';
import { isEdit } from '../../utils/Edit.util';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

const _useDepartmentForm = makeUseForm(departmentService.create, {
  name: '',
  isEmpty: true,
});

export const useDepartmentForm = () => {
  const state = _useDepartmentForm();
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleOpenForm(open: boolean) {
    return () => setOpenForm(open);
  }

  function onSuccess() {
    message.success('Departamento atualizado com sucesso');
    setOpenForm(false);
    setLoading(false);
  }

  const handleError = (err: any) => {
    setLoading(false);
    onError();
    return throwError(() => err);
  };

  const edit = (data: IDepartmentFormInstance & { readonly id: string }) => {
    setLoading(true);

    return departmentService
      .patch(data)
      .pipe(tap(onSuccess))
      .pipe(catchError(handleError));
  };

  const onSubmit = (form: IDepartmentFormInstance) => {
    if (isEdit(form)) {
      return edit(form);
    }

    return state.create(form)?.pipe(
      tap(() => {
        message.success('Departamento criado com sucesso');
        setOpenForm(false);
      })
    );
  };

  const onEdit = (element: IDepartmentFormInstance) => {
    setOpenForm(true);
    state.setForm(element);
  };

  return {
    ...state,
    openForm,
    handleOpenForm,
    setOpenForm,
    onEdit,
    onSubmit,
    loading: state.loading || loading,
  };
};
