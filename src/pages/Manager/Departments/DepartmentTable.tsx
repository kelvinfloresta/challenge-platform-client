import Table, { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';
import { catchError, Observable, of, tap } from 'rxjs';

import { ResultError } from '../../../components/ResultError';
import { onError } from '../../../components/Toaster';
import { useDeleteColumn } from '../../../hooks/antd/useDeleteColumn';
import { useEditColumn } from '../../../hooks/antd/useEditColumn';
import { IListDepartmentOutput } from '../../../services/Department.service';

import { onDeleteDepartmentWithUsers } from './Toaster';

interface IDepartmentTableProps {
  readonly listError: boolean;
  readonly departments: IListDepartmentOutput[];
  readonly listLoading: boolean;
  readonly deleteLoading: boolean;
  reload(): void;
  onDelete(id: string): Observable<never>;
  onEdit(element: IListDepartmentOutput): void;
}

const columns: ColumnsType<IListDepartmentOutput> = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
];

function onDeleteError(err: any) {
  if (err === 'DELETE_DEPARTMENT_WITH_USERS') {
    onDeleteDepartmentWithUsers();
  } else {
    onError();
  }

  return of();
}

export const DepartmentTable = ({
  departments,
  listLoading,
  deleteLoading,
  onDelete: del,
  reload,
  listError,
  onEdit,
}: IDepartmentTableProps) => {
  const handleDelete = useCallback(
    (department: IListDepartmentOutput) =>
      del(department.id).pipe(tap(reload)).pipe(catchError(onDeleteError)),
    [del, reload]
  );

  const editColumn = useEditColumn<IListDepartmentOutput>({
    onEdit,
  });

  const deleteColumn = useDeleteColumn<IListDepartmentOutput>({
    deleteLoading,
    onDelete: handleDelete,
  });

  if (listError) {
    return <ResultError retry={reload} />;
  }

  return (
    <Table
      rowKey='id'
      columns={[...columns, editColumn, deleteColumn]}
      dataSource={departments}
      loading={listLoading}
      pagination={{
        responsive: true,
      }}
    />
  );
};
