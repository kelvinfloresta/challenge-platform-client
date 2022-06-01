import { addHours, setHours, startOfDay } from 'date-fns';
import { useEffect } from 'react';

import { ICampaignFormInstance } from '../../pages/Campaigns/CampaignForm/ICampaignForm';
import {
  campaignService,
  ICreateCampaignInput,
} from '../../services/Campaigns.service';
import { useDepartmentList } from '../department/useDepartmentList.hook';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

const _useCampaignForm = makeUseForm(campaignService.create, {
  title: '',
  challenges: [],
  onlyDepartments: [],
  isEmpty: true,
});

export const useCampaignForm = () => {
  const state = _useCampaignForm();
  const department = useDepartmentList();
  const { list } = department;

  useEffect(() => {
    const sub = list().subscribe();

    return () => sub.unsubscribe();
  }, [list]);

  const onSubmit = (form: ICampaignFormInstance) => {
    const todayAt9AM = setHours(startOfDay(form.initialDate), 9);
    const hours = 24 * 7 * form.duration;

    const challenges = form.challenges.map((el, i) => {
      const startDate = addHours(todayAt9AM, i * hours);
      const endDate = addHours(startDate, hours);

      return {
        challengeId: el.challengeId,
        startDate,
        endDate,
      };
    });

    const newCampaign: ICreateCampaignInput = {
      title: form.title,
      challenges,
      onlyDepartments: form.onlyDepartments,
      onlyUsersCreatedAtGte: form.onlyUsersCreatedAtGte,
      onlyUsersCreatedAtLte: form.onlyUsersCreatedAtLte,
    };

    return state.create(newCampaign);
  };

  return {
    ...state,
    department,
    onSubmit,
  };
};
