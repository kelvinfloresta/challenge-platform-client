import { ColumnsType } from 'antd/lib/table';
import React, { useState, useMemo } from 'react';
import { Observable } from 'rxjs';

import { ConfirmDelete } from '../../components/ConfirmDelete.component';

export interface ITableDataDelete<T> {
  onDelete(id: T): Observable<never>;
  deleteLoading: boolean;
}

export function useDeleteColumn<RecordType extends { id: string }>({
  deleteLoading,
  onDelete,
}: ITableDataDelete<RecordType>): ColumnsType<RecordType>[number] {
  const [selected, setSelected] = useState<RecordType | null>(null);
  const deleteColumn = useMemo(() => {
    const onConfirm = (id: RecordType) => {
      if (!id) {
        return;
      }
      onDelete(id).subscribe(() => setSelected(null));
    };

    function onClickCell(record: RecordType) {
      return () => {
        const alreadyOpen = selected !== null;
        if (alreadyOpen) {
          return;
        }
        setSelected(record);
      };
    }

    function createDeleteColumn(): ColumnsType<RecordType>[number] {
      return {
        className: 'action-button',
        render(_, record) {
          return (
            <ConfirmDelete
              onClose={() => setSelected(null)}
              onOpenConfirm={onClickCell(record)}
              onConfirm={() => onConfirm(record)}
              isOpen={record === selected}
              loading={deleteLoading}
            />
          );
        },
      };
    }

    const deleteColumn = createDeleteColumn();
    return deleteColumn;
  }, [deleteLoading, selected, onDelete]);

  return deleteColumn;
}
