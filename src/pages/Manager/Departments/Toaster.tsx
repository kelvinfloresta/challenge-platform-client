import { message, Typography } from 'antd';
import React from 'react';

export const onDeleteDepartmentWithUsers = () => {
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Departamento com usuários
      </Typography.Title>
      <Typography.Text>
        Por favor, mova os usuários para um outro departamento primeiro
      </Typography.Text>
    </>
  );
};
