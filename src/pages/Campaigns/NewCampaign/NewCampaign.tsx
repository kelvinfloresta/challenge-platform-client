import React from 'react';
import { useNavigate } from 'react-router';

import { useCampaignForm } from '../../../hooks/campaign/useCampaignForm.hook';
import { CampaignForm } from '../CampaignForm/CampaignForm';
import { ICampaignFormInstance } from '../CampaignForm/ICampaignForm';

const NewCampaign = () => {
  const { department, loading, error, onSubmit } = useCampaignForm();
  const navigate = useNavigate();

  const handleSubmit = (form: ICampaignFormInstance) => {
    onSubmit(form)?.subscribe(() => {
      navigate('/finish-new-campaign');
    });
  };

  return (
    <CampaignForm
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      departments={department.elements}
      departmentsLoading={department.listLoading}
    />
  );
};

export default NewCampaign;
