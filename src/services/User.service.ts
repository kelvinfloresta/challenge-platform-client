import httpRequest from '../adapters/HttpRequest';
import { IPaginate, IPaginateInput } from '../hooks/hookMakers/IHookMaker';

import { IUserRole } from './Auth.service';

export type IUserStatus = 'active' | 'suspended';

export interface IListUserOutput {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly document: string;
  readonly phone: string;
  readonly jobPosition: string;
  readonly departmentId: string;
  readonly status: IUserStatus;
  readonly role: IUserRole;
}

interface ICreateUserInput {
  readonly name: string;
  readonly email: string;
  readonly role: IUserRole;
  readonly jobPosition: string;
  readonly departmentId: string;
}

interface IPatchUserInput {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly jobPosition: string;
  readonly departmentId: string;
  readonly role: IUserRole;
}

export interface IChangeStatusUserInput {
  readonly id: string;
  readonly departmentId: string;
  readonly newStatus: IUserStatus;
}

export interface IDeleteUserInput {
  readonly id: string;
  readonly departmentId: string;
}

export interface IPaginateUserInput extends IPaginateInput {
  readonly name?: string;
  readonly email?: string;
  readonly departmentId?: string;
  readonly status?: IUserStatus;
  readonly role?: IUserRole;
}

export const userService = {
  paginate({ actualPage, pageSize, ...filter }: IPaginateUserInput) {
    return httpRequest.get<IPaginate<IListUserOutput>>(
      `/companies/users/${actualPage}/${pageSize}`,
      { query: filter }
    );
  },
  create(input: ICreateUserInput) {
    return httpRequest.post<string>('/users', input);
  },
  del(input: IDeleteUserInput) {
    return httpRequest.delete<never>(
      `/departments/${input.departmentId}/user/${input.id}`
    );
  },
  patch(input: IPatchUserInput) {
    return httpRequest.patch<never>(
      `/users/${input.id}/${input.departmentId}`,
      input
    );
  },
  changeStatus(input: IChangeStatusUserInput) {
    return httpRequest.patch<never>(`/companies/users/status/`, {
      user_id: input.id,
      department_id: input.departmentId,
      status: input.newStatus,
    });
  },
};
