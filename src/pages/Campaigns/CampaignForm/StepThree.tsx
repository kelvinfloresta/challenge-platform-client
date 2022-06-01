import { Form, Select, Typography } from 'antd';
import React, { useMemo } from 'react';

import { IListDepartmentOutput } from '../../../services/Department.service';

import { FieldBox } from './styles';

interface IDepartmentsList {
  readonly departmentsLoading: boolean;
  readonly departments: IListDepartmentOutput[];
}

export const StepThree = ({
  departmentsLoading,
  departments,
}: IDepartmentsList) => {
  const departmentOptions = useMemo(
    () => departments.map(el => ({ label: el.name, value: el.id })),
    [departments]
  );

  return (
    <>
      <Form.Item
        label='Apenas os departamentos'
        name='onlyDepartments'
        messageVariables={{ name: 'Departamento' }}
      >
        <FieldBox>
          <Select
            loading={departmentsLoading}
            options={departmentOptions}
            mode='multiple'
            placeholder='Este campo é opcional'
            // style={{ width: '20%' }}
          />
        </FieldBox>
      </Form.Item>

      <Typography.Text type='secondary'>
        * Por padrão todos os departamentos são selecionados
      </Typography.Text>
    </>
  );
};

export default StepThree;
