import { Button, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';

import { onError } from '../../../components/Toaster';

export interface IDepartmentFormInstance {
  readonly id?: string;
  readonly name: string;
}

interface IDepartmentFormProps {
  readonly form: IDepartmentFormInstance;
  readonly loading: boolean;
  readonly error: unknown;
  onSubmit(form: any): void;
  onBack(): void;
}

export const DepartmentForm = ({
  onSubmit,
  error,
  loading,
  onBack,
  form,
}: IDepartmentFormProps) => {
  const [antdForm] = useForm();

  useEffect(() => {
    antdForm.setFieldsValue(form);
  }, [antdForm, form]);

  useEffect(() => {
    if (error === null) {
      return;
    }

    onError();
  }, [error]);

  return (
    <Form
      form={antdForm}
      onFinish={onSubmit}
      layout='vertical'
      autoComplete='off'
    >
      <Form.Item name='id' hidden>
        <Input />
      </Form.Item>

      <Form.Item
        label='Nome'
        name='name'
        rules={[{ required: true }]}
        messageVariables={{ name: 'Nome' }}
      >
        <Input />
      </Form.Item>

      <Space>
        <Button loading={loading} type='primary' htmlType='submit'>
          Salvar
        </Button>
        <Button onClick={onBack} type='link'>
          Voltar
        </Button>
      </Space>
    </Form>
  );
};
