import { DeleteTwoTone } from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
import React from 'react';

interface IConfirmDeleteProps {
  isOpen: boolean;
  loading: boolean;
  onConfirm(): void;
  onOpenConfirm(): void;
  onClose(): void;
}

export function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  loading,
  onOpenConfirm,
}: IConfirmDeleteProps) {
  return (
    <Tooltip title='Excluir'>
      <Popconfirm
        placement='left'
        title='Deseja realmente excluir?'
        okText='Sim'
        cancelText='Não'
        visible={isOpen}
        onConfirm={onConfirm}
        onCancel={onClose}
        okButtonProps={{ loading }}
      >
        <DeleteTwoTone onClick={onOpenConfirm} twoToneColor='#ff7875' />
      </Popconfirm>
    </Tooltip>
  );
}
