import { IListCampaignUsersOutput } from '../../../services/Campaigns.service';

export type IDepartmentFilter = string | undefined;

export const filter = (
  users: IListCampaignUsersOutput[],
  departmentFilter: IDepartmentFilter,
  nameFilter: string
) => {
  return users.filter(user => {
    if (departmentFilter && user.departmentId !== departmentFilter) {
      return false;
    }

    if (
      nameFilter &&
      !user.name.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};
