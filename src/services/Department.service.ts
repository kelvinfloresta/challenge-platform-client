import httpRequest from '../adapters/HttpRequest';

export interface IListDepartmentOutput {
  readonly id: string;
  readonly name: string;
}

interface ICreateDepartmentInput {
  readonly name: string;
}

interface IPatchDepartmentInput {
  readonly id: string;
  readonly name: string;
}

export const departmentService = {
  list() {
    return httpRequest.get<IListDepartmentOutput[]>('/departments');
  },
  create(input: ICreateDepartmentInput) {
    return httpRequest.post<string>('/departments', input);
  },
  del(id: string) {
    return httpRequest.delete<never>(`/departments/${id}`);
  },
  patch(input: IPatchDepartmentInput) {
    return httpRequest.patch<never>(`/departments/${input.id}`, input);
  },
};
