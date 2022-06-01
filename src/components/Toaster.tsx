import { message, Typography } from 'antd';
import React from 'react';

export const onError = () =>
  message.error(
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Um erro ocorreu
      </Typography.Title>
      <Typography.Text>
        Por favor entre em contato caso persista
      </Typography.Text>
    </>
  );
