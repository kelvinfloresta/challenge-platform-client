import { EditTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo } from 'react';

export interface ITableDataDelete<RecordType> {
  onEdit(record: RecordType): void;
}

export function useEditColumn<RecordType extends { id: string }>({
  onEdit,
}: ITableDataDelete<RecordType>): ColumnsType<RecordType>[number] {
  const editColumn: ColumnsType<RecordType>[number] = useMemo(() => {
    return {
      className: 'action-button',
      onCell: record => ({
        title: 'Editar',
        onClick: () => onEdit(record),
      }),
      render: () => (
        <Tooltip title='Editar'>
          <EditTwoTone style={{ cursor: 'pointer' }} twoToneColor='#ff7875' />
        </Tooltip>
      ),
    };
  }, [onEdit]);

  return editColumn;
}
