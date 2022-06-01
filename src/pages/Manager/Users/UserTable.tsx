import {
  CheckOutlined,
  CloseOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
} from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useMemo } from 'react';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ResultError } from '../../../components/ResultError';
import { onError } from '../../../components/Toaster';
import { useDeleteColumn } from '../../../hooks/antd/useDeleteColumn';
import { useEditColumn } from '../../../hooks/antd/useEditColumn';
import { useUserChangeStatus } from '../../../hooks/user/useUserChangeStatus.hook';
import {
  IDeleteUserInput,
  IListUserOutput,
} from '../../../services/User.service';
import { translateStatus } from '../../../todo-remove';

interface IUserTableProps {
  readonly listError: boolean;
  readonly users: readonly IListUserOutput[];
  readonly listLoading: boolean;
  readonly deleteLoading: boolean;
  readonly actualPage: number;
  readonly pageSize: number;
  readonly total: number;
  readonly changeStatus: ReturnType<typeof useUserChangeStatus>;
  reload(): void;
  onDelete(id: IDeleteUserInput): Observable<never>;
  onEdit(element: IListUserOutput): void;
  onChangePage(page: number, pageSize: number): void;
}

const columns: ColumnsType<IListUserOutput> = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Departamento',
    dataIndex: 'departmentName',
  },
  {
    title: 'Gestor?',
    dataIndex: 'role',
    render: v =>
      v === 'companyManager' ? <CheckOutlined /> : <CloseOutlined />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: translateStatus,
  },
];

function onDeleteError(err: any) {
  onError();
  return throwError(() => err);
}

export const UserTable = ({
  users,
  listLoading,
  deleteLoading,
  onDelete: del,
  reload,
  listError,
  onEdit,
  actualPage,
  pageSize,
  total,
  onChangePage,
  changeStatus,
}: IUserTableProps) => {
  const handleDelete = useCallback(
    (input: IDeleteUserInput) =>
      del(input).pipe(tap(reload)).pipe(catchError(onDeleteError)),
    [del, reload]
  );

  const editColumn = useEditColumn<IListUserOutput>({
    onEdit,
  });

  const deleteColumn = useDeleteColumn<IListUserOutput>({
    deleteLoading,
    onDelete: handleDelete,
  });

  const { onChangeStatus, changeStatusLoading, onClose, onOpen, openId } =
    changeStatus;

  const changeStatusColumn: ColumnsType<IListUserOutput>[number] =
    useMemo(() => {
      return {
        className: 'action-button',
        dataIndex: 'status',
        render: (status, user) => {
          const active = status === 'active';
          const message = active
            ? 'Deseja suspender o usuário?'
            : 'Deseja ativar o usuário?';

          const title = active ? 'Suspender' : 'Ativar';
          return (
            <Tooltip title={title}>
              <Popconfirm
                title={message}
                placement='left'
                okText='Sim'
                cancelText='Não'
                visible={user.id === openId}
                onCancel={onClose}
                onConfirm={() => onChangeStatus(user)}
                okButtonProps={{ loading: changeStatusLoading[user.id] }}
              >
                {active && (
                  <PauseCircleTwoTone
                    onClick={onOpen(user.id)}
                    twoToneColor='#ff7875'
                  />
                )}

                {!active && (
                  <PlayCircleTwoTone
                    onClick={onOpen(user.id)}
                    twoToneColor='#ff7875'
                  />
                )}
              </Popconfirm>
            </Tooltip>
          );
        },
      };
    }, [changeStatusLoading, onChangeStatus, onClose, onOpen, openId]);

  if (listError) {
    return <ResultError retry={reload} />;
  }

  return (
    <Table
      rowKey='id'
      columns={[...columns, changeStatusColumn, editColumn, deleteColumn]}
      dataSource={users}
      loading={listLoading}
      pagination={{
        responsive: true,
        current: actualPage,
        pageSize,
        total,
        onChange: onChangePage,
      }}
    />
  );
};
