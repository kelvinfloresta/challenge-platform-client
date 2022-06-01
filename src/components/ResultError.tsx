import Button from 'antd/lib/button';
import Result from 'antd/lib/result';
import React from 'react';

interface IResultErrorProps {
  retry(): void;
}

export const ResultError = ({ retry }: IResultErrorProps) => {
  return (
    <Result
      status='error'
      title='Um erro ocorreu'
      subTitle='Por favor entre em contato caso persista'
      extra={
        <Button type='link' onClick={retry}>
          Tentar novamente
        </Button>
      }
    />
  );
};
