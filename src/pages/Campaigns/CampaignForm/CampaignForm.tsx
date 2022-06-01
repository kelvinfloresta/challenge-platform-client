import { Button, Card, Divider, Form, Popconfirm, Space, Steps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onError } from '../../../components/Toaster';
import { to } from '../../../utils/Async.util';

import { Duration } from './Duration';
import { FormStep } from './FormStep';
import { ICampaignFormProps, ICampaignFormInstance } from './ICampaignForm';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import { MinimumChallenges } from './messages';
import { Footer } from './styles';

const { Step } = Steps;

const steps = [
  'Selecione 1 ou mais Desafios',
  'Selecione a duração',
  'Selecione os departamentos',
  'Selecione usuários pela data',
];

const INITIAL_STATE = {
  challenges: [],
  duration: Duration.oneWeek,
  segments: [],
  initialDate: new Date(),
};

export const CampaignForm = ({
  onSubmit,
  error,
  departmentsLoading,
  departments,
}: ICampaignFormProps) => {
  const [form] = useForm<ICampaignFormInstance>();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  async function validateSteps() {
    if (FormStep.One === current) {
      const challenges = form.getFieldValue('challenges');
      if (challenges.length === 0) {
        MinimumChallenges();
        form.setFields([
          {
            name: 'challenges',
            value: [],
            errors: ['empty_challenges'],
          },
        ]);
        return false;
      }
    }

    const [error] = await to(form.validateFields());
    if (error) {
      return false;
    }

    return true;
  }

  const next = async () => {
    const isValid = await validateSteps();
    if (!isValid) {
      return;
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (error === null) {
      return;
    }

    onError();
  }, [error]);

  const onChange = async (current: any) => {
    const isValid = await validateSteps();
    if (!isValid) {
      return;
    }

    setCurrent(current);
  };

  const handleSubmit = () => onSubmit(form.getFieldsValue(true));

  return (
    <>
      <Card title='Lançar Desafio'>
        <Steps current={current} onChange={onChange}>
          {steps.map(title => (
            <Step key={title} title={title} />
          ))}
        </Steps>

        <Form
          form={form}
          onFinish={handleSubmit}
          autoComplete='off'
          layout='vertical'
          initialValues={INITIAL_STATE}
        >
          <div style={{ marginTop: '2rem', minHeight: '200px' }}>
            {current === 0 && <StepOne />}
            {current === 1 && <StepTwo />}
            {current === 2 && (
              <StepThree
                departments={departments}
                departmentsLoading={departmentsLoading}
              />
            )}
            {current === 3 && <StepFour />}
          </div>
        </Form>
      </Card>

      <Footer>
        <Space split={<Divider type='vertical' />}>
          <Popconfirm
            title='Tem certeza?'
            okText='Sim'
            cancelText='Não'
            onConfirm={() => navigate('/campaigns')}
          >
            <Button type='link'>Cancelar</Button>
          </Popconfirm>

          <Button disabled={current === 0} type='link' onClick={prev}>
            Voltar
          </Button>

          <Button
            disabled={current === steps.length - 1}
            type='link'
            onClick={next}
          >
            Próximo
          </Button>

          <Button
            disabled={current < steps.length - 1}
            type='link'
            onClick={form.submit}
          >
            Finalizar
          </Button>
        </Space>
      </Footer>
    </>
  );
};

export default CampaignForm;
