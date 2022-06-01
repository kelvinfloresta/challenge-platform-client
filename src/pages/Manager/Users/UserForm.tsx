import {
  Button,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Typography,
} from 'antd';
import MaskedInput from 'antd-mask-input';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useMemo, useState } from 'react';

import { onError } from '../../../components/Toaster';
import { IUserRole } from '../../../services/Auth.service';
import { IListDepartmentOutput } from '../../../services/Department.service';
import {
  fixRequiredMaskInput,
  validateCPF,
  validateNumberLen,
} from '../../../utils/Validate.util';

export interface IUserFormInstance {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly document: string;
  readonly loginWith?: 'email' | 'document';
  readonly jobPosition: string;
  readonly departmentId: string;
  readonly phone: string;
  readonly role: IUserRole;
}

interface IUserFormProps {
  readonly form: IUserFormInstance;
  readonly loading: boolean;
  readonly departmentsLoading: boolean;
  readonly departments: IListDepartmentOutput[];
  readonly error: unknown;
  onSubmit(form: IUserFormInstance): void;
  onBack(): void;
}

const rolesOptions = [
  { label: 'Usuário comum', value: 'user' },
  { label: 'Gestor', value: 'companyManager' },
];

export const UserForm = ({
  onSubmit,
  error,
  loading,
  onBack,
  form,
  departmentsLoading,
  departments,
}: IUserFormProps) => {
  const [antdForm] = useForm<IUserFormInstance>();
  const [loginWith, setLoginWith] = useState<IUserFormInstance['loginWith']>();

  useEffect(() => {
    const loginWith = form.document ? 'document' : 'email';
    setLoginWith(loginWith);

    antdForm.setFieldsValue({ ...form, loginWith });
  }, [antdForm, form]);

  useEffect(() => {
    if (error === null) {
      return;
    }

    if (error === 'DUPLICATED_EMAIL') {
      return message.error(
        <Typography.Title level={5}>Email já cadastrado</Typography.Title>
      );
    }

    if (error === 'DUPLICATED_LOGIN') {
      return message.error(
        <Typography.Title level={5}>Login já cadastrado</Typography.Title>
      );
    }

    onError();
  }, [error]);

  const departmentOptions = useMemo(
    () => departments.map(el => ({ label: el.name, value: el.id })),
    [departments]
  );

  const handleChangeLoginWith = (value: RadioChangeEvent) => {
    setLoginWith(value.target.value);
  };

  const isEdit = typeof form.id === 'string';
  const loginWithDocument = loginWith === 'document';
  const loginWithEmail = loginWith === 'email';

  return (
    <Form
      form={antdForm}
      onFinish={onSubmit}
      autoComplete='off'
      layout='vertical'
      initialValues={{ loginWith }}
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

      <Form.Item
        label='Login com'
        name='loginWith'
        rules={[{ required: true }]}
      >
        <Radio.Group onChange={handleChangeLoginWith}>
          <Radio value='email'>E-mail</Radio>
          <Radio value='document'>CPF</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label='E-mail'
        name='email'
        hidden={!loginWithEmail}
        rules={[{ type: 'email', required: loginWithEmail }]}
        messageVariables={{ name: 'E-mail' }}
      >
        <Input name='email' />
      </Form.Item>

      <Form.Item
        label='CPF'
        name='document'
        hidden={!loginWithDocument}
        required={loginWithDocument}
        messageVariables={{ name: 'CPF' }}
        rules={[
          { validator: fixRequiredMaskInput(loginWithDocument) },
          { validator: validateCPF },
        ]}
      >
        <MaskedInput mask={[{ mask: '000.000.000-00', lazy: false }]} />
      </Form.Item>

      <Form.Item
        label='Telefone'
        name='phone'
        messageVariables={{ name: 'Telefone' }}
        required={loginWithDocument}
        rules={[
          { validator: fixRequiredMaskInput(loginWithDocument) },
          { validator: validateNumberLen(11) },
        ]}
      >
        <MaskedInput
          mask={[
            {
              mask: '(00) 00000-0000',
              lazy: false,
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        label='Departamento'
        name='departmentId'
        rules={[{ required: true }]}
        messageVariables={{ name: 'Departamento' }}
      >
        <Select
          disabled={isEdit}
          loading={departmentsLoading}
          options={departmentOptions}
        />
      </Form.Item>

      <Form.Item label='Permissão' name='role' rules={[{ required: true }]}>
        <Select options={rolesOptions} />
      </Form.Item>

      <Form.Item label='Cargo' name='jobPosition'>
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
