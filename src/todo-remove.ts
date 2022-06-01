import { IResultStatus } from './services/Campaigns.service';
import { IUserStatus } from './services/User.service';

export function translateStatus(status: IUserStatus | IResultStatus): string {
  if (status === 'active') {
    return 'Ativo';
  }

  return 'Suspenso';
}
