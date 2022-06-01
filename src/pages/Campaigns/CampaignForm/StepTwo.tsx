import { EditOutlined } from '@ant-design/icons';
import { Form, Radio, Typography } from 'antd';
import { isSameDay, format, addDays } from 'date-fns';
import React, { useMemo, useState } from 'react';

import { formatDate } from '../../../utils/Date.util';

import { Duration } from './Duration';
import { DatePickerAsText } from './styles';

export const StepTwo = () => {
  const form = Form.useFormInstance();
  const initialDate = Form.useWatch('initialDate', form);

  const [duration, setDuration] = useState(Duration.oneWeek);
  const { previewDate, challengeAmount } = useMemo(() => {
    const safeInitialDate = initialDate || new Date();
    const challengeAmount = form.getFieldValue('challenges').length;
    const previewDate = addDays(
      safeInitialDate,
      duration * 7 * challengeAmount
    );
    return { previewDate, challengeAmount };
  }, [duration, form, initialDate]);

  const disabledDate = (current: any) => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return current && current < today;
  };

  return (
    <>
      <Form.Item
        label='Duração de cada desafio'
        name='duration'
        rules={[{ required: true }]}
      >
        <Radio.Group onChange={e => setDuration(e.target.value)}>
          <Radio value={Duration.oneWeek}>1 Semana</Radio>
          <Radio value={Duration.twoWeeks}>2 Semanas</Radio>
          <Radio value={Duration.threeWeeks}>3 Semanas</Radio>
          <Radio value={Duration.fourWeeks}>4 Semanas</Radio>
        </Radio.Group>
      </Form.Item>

      <Typography.Paragraph type='secondary'>
        * Inicia
        <Form.Item noStyle name='initialDate'>
          <DatePickerAsText
            bordered={false}
            format={date => {
              const today = new Date();
              if (isSameDay(date, today)) {
                return 'hoje';
              }

              if (isSameDay(date, addDays(today, 1))) {
                return 'amanhã';
              }

              return format(date, 'dd/MM/yyyy');
            }}
            allowClear={false}
            suffixIcon={<EditOutlined />}
            disabledDate={disabledDate}
          />
        </Form.Item>
        e termina em {formatDate(previewDate.toISOString())}
      </Typography.Paragraph>

      <Typography.Paragraph type='secondary'>
        * Total de desafios selecionados {challengeAmount}
      </Typography.Paragraph>
    </>
  );
};

export default StepTwo;
