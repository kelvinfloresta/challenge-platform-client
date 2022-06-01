import { Space } from 'antd';
import React from 'react';

export const ResultIcon = ({
  icon,
  text,
}: {
  icon: any;
  text: React.ReactNode;
}) => (
  <Space style={{ userSelect: 'none' }}>
    {React.createElement(icon)}
    {text}
  </Space>
);
