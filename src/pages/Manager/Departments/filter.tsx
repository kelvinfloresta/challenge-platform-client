import { IListDepartmentOutput } from '../../../services/Department.service';

export const filter = (
  elements: IListDepartmentOutput[],
  nameFilter: string
) => {
  let filtered = elements;

  if (nameFilter !== '') {
    filtered = filtered.filter(department =>
      department.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  return filtered;
};
