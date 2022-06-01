import { ColumnsType } from 'antd/lib/table';

import { IListCampaignUsersOutput } from '../../../services/Campaigns.service';

export const columns: ColumnsType<IListCampaignUsersOutput> = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Departamento',
    dataIndex: 'departmentName',
  },
  {
    title: 'IMPD',
    dataIndex: 'impd',
    render: v => `${v}%`,
  },
];
