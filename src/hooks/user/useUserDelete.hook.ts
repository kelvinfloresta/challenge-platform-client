import { userService } from '../../services/User.service';
import { makeUseDelete } from '../hookMakers/makeUseDelete.hook';

export const useUserDelete = makeUseDelete(userService.del);
