import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Input, Space } from 'antd';
import _debounce from 'lodash/debounce';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import PageWrapper from '../../../components/PageWrapper';
import { useDeleteDepartment } from '../../../hooks/department/useDepartmentDelete.hook';
import { useDepartmentForm } from '../../../hooks/department/useDepartmentForm.hook';
import { useDepartmentList } from '../../../hooks/department/useDepartmentList.hook';

import { DepartmentForm, IDepartmentFormInstance } from './DepartmentForm';
import { DepartmentTable } from './DepartmentTable';
import { filter } from './filter';

export const Department = () => {
  const { elements, list, listError, listLoading } = useDepartmentList();
  const {
    form,
    loading,
    error,
    onEdit,
    openForm,
    handleOpenForm,
    onSubmit,
    setOpenForm,
    cleanForm,
  } = useDepartmentForm();

  const { del, deleteLoading } = useDeleteDepartment();
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const subscription = list().subscribe();
    return () => subscription.unsubscribe();
  }, [list]);

  const handleSubmit = (form: IDepartmentFormInstance) => {
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
      Cadastrar departamento
    </Button>
  );

  const filtered = useMemo(() => {
    return filter(elements, nameFilter);
  }, [elements, nameFilter]);

  const onChangeNameFilter = (ev: ChangeEvent<HTMLInputElement>) =>
    setNameFilter(ev.target.value);
  const debounceOnChangeNameFilter = useMemo(
    () => _debounce(onChangeNameFilter, 400),
    []
  );

  return (
    <PageWrapper>
      <Card title='Departamentos' extra={extra}>
        <Space style={{ marginBottom: '2rem' }}>
          <Input
            name='name'
            style={{ width: 250 }}
            placeholder='Buscar departamento'
            onChange={debounceOnChangeNameFilter}
            allowClear
          />
        </Space>

        <DepartmentTable
          onEdit={onEdit}
          departments={filtered}
          listError={listError}
          listLoading={listLoading}
          reload={() => list().subscribe()}
          onDelete={del}
          deleteLoading={deleteLoading}
        />
      </Card>

      <Drawer
        title='Cadastrar departamento'
        visible={openForm}
        destroyOnClose
        onClose={handleOpenForm(false)}
      >
        <DepartmentForm
          form={form}
          onSubmit={handleSubmit}
          onBack={handleOpenForm(false)}
          loading={loading}
          error={error}
        />
      </Drawer>
    </PageWrapper>
  );
};
