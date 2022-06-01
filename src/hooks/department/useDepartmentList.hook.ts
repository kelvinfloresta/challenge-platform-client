import { departmentService } from '../../services/Department.service';
import { makeUseList } from '../hookMakers/makeUseList.hook';

export const useDepartmentList = makeUseList(departmentService.list);
