import { message } from 'antd';

export const MinimumChallenges = () =>
  message.error('Selecione um ou mais desafios para prosseguir');

export const CampaignCreated = () =>
  message.success('Campanha criada com sucesso');
