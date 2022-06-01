import { departmentService } from '../../services/Department.service';
import { makeUseDelete } from '../hookMakers/makeUseDelete.hook';

export const useDeleteDepartment = makeUseDelete(departmentService.del);
