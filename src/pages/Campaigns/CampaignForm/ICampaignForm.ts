import { IListDepartmentOutput } from '../../../services/Department.service';

import { Duration } from './Duration';

export interface ICampaignFormInstance {
  readonly title: string;
  readonly duration: Duration;
  readonly initialDate: Date;
  readonly challenges: Array<{
    readonly challengeId: string;
    readonly title: string;
  }>;
  readonly onlyDepartments: string[];
  readonly onlyUsersCreatedAtGte?: Date;
  readonly onlyUsersCreatedAtLte?: Date;
}

export interface ICampaignFormProps {
  readonly loading: boolean;
  readonly error: unknown;
  readonly departmentsLoading: boolean;
  readonly departments: IListDepartmentOutput[];
  onSubmit(form: ICampaignFormInstance): void;
}
