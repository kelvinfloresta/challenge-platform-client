import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Input, Space } from 'antd';
import React from 'react';

import PageWrapper from '../../../components/PageWrapper';
import { useUserChangeStatus } from '../../../hooks/user/useUserChangeStatus.hook';
import { useUserDelete } from '../../../hooks/user/useUserDelete.hook';
import { useUserForm } from '../../../hooks/user/useUserForm.hook';
import { useUserPaginate } from '../../../hooks/user/useUserPaginate.hook';

import { IUserFormInstance, UserForm } from './UserForm';
import { UserTable } from './UserTable';

export const User = () => {
  const {
    elements,
    list,
    listError,
    listLoading,
    actualPage,
    pageSize,
    total,
    onChangePage,
    reload,
    filter,
    onChangeFilter,
    cleanFilter,
  } = useUserPaginate();
  const {
    department,
    openForm,
    handleOpenForm,
    loading,
    error,
    form,
    setOpenForm,
    onEdit,
    onSubmit,
    cleanForm,
  } = useUserForm();
  const { del, deleteLoading } = useUserDelete();
  const changeStatus = useUserChangeStatus(reload);

  const handleSubmit = (form: IUserFormInstance) => {
    onSubmit(form)?.subscribe(() => {
      list().subscribe();
    });
  };

  const extra = (
    <Button
      type='dashed'
      icon={<PlusOutlined />}
      onClick={() => {
        setOpenForm(true);
        cleanForm();
      }}
    >
      Cadastrar usuário
    </Button>
  );

  return (
    <PageWrapper>
      <Card title='Usuários' extra={extra}>
        <Space style={{ marginBottom: '2rem' }}>
          <Input
            name='name'
            style={{ width: 250 }}
            placeholder='Filtrar por nome'
            onChange={onChangeFilter}
            value={filter.name}
          />

          <Input
            name='email'
            style={{ width: 250 }}
            placeholder='Filtrar por email'
            onChange={onChangeFilter}
            value={filter.email}
          />

          <Button
            type='text'
            onClick={cleanFilter}
            icon={<CloseOutlined style={{ fontSize: '0.66rem' }} />}
          >
            Limpar
          </Button>
        </Space>

        <UserTable
          onEdit={onEdit}
          users={elements}
          total={total}
          onChangePage={onChangePage}
          listError={listError}
          listLoading={listLoading}
          reload={reload}
          onDelete={del}
          deleteLoading={deleteLoading}
          changeStatus={changeStatus}
          actualPage={actualPage}
          pageSize={pageSize}
        />
      </Card>

      <Drawer
        title='Cadastrar usuário'
        visible={openForm}
        destroyOnClose
        size='large'
        onClose={handleOpenForm(false)}
      >
        <UserForm
          form={form}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          onBack={handleOpenForm(false)}
          departments={department.elements}
          departmentsLoading={department.listLoading}
        />
      </Drawer>
    </PageWrapper>
  );
};
