import { DatePicker, Form } from 'antd';
import React from 'react';

import { FieldBox } from './styles';

export const StepThree = () => {
  return (
    <>
      <Form.Item
        label='Apenas usuários criados a partir de'
        name='onlyUsersCreatedAtGte'
      >
        <FieldBox>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            placeholder='Este campo é opcional'
            format='YYYY-MM-DD HH:mm'
          />
        </FieldBox>
      </Form.Item>

      <Form.Item
        label='Apenas usuários criados antes de'
        name='onlyUsersCreatedAtLte'
      >
        <FieldBox>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder='Este campo é opcional'
          />
        </FieldBox>
      </Form.Item>
    </>
  );
};

export default StepThree;
