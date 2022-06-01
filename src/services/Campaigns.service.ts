import { Observable, map } from 'rxjs';

import httpRequest from '../adapters/HttpRequest';

interface IOption {
  readonly id: string;
  readonly title: string;
}

interface IQuestion {
  readonly id: string;
  readonly title: string;
  readonly remainingTries: number;
  readonly options: IOption[];
}

interface IGetChallengesInput {
  readonly campaign_id: string;
  readonly challenge_id: string;
}

interface IAnswerCampaignInput {
  readonly campaign_id: string;
  readonly challenge_id: string;
  readonly question_id: string;
  readonly option_id: string;
}

interface IAnswerCampaignOutput {
  readonly Correct: boolean;
  readonly RemainingTries: number;
}

interface IChallengeMedia {
  readonly ID: string;
  readonly Title: string;
  readonly Description: string;
  readonly Path: string;
  readonly Thumb: string;
}

export interface IListCampaignChallengesOutput {
  readonly ID: string;
  readonly Title: string;
  readonly Media: IChallengeMedia;
  readonly EndDate: Date;
  readonly CampaignID: string;
}

export interface IListCampaignOutput {
  readonly CampaignID: string;
  readonly Title: string;
  readonly StartDate: string;
  readonly EndDate: string;
}

export interface ICreateCampaignInput {
  readonly title: string;
  readonly challenges: Array<{
    readonly challengeId: string;
    readonly startDate: Date;
    readonly endDate: Date;
  }>;
  readonly onlyDepartments?: string[];
  readonly onlyUsersCreatedAtGte?: Date;
  readonly onlyUsersCreatedAtLte?: Date;
}

export interface IGetUserIMPDOutput {
  readonly avg: number;
  readonly companyAvg: number;
}

export interface IListDepartmentIMPDOutput {
  readonly AVG: number;
  readonly DepartmentID: string;
  readonly DepartmentName: string;
}

export type IResultStatus = 'active' | 'suspended';

interface IListResultsInput {
  readonly campaignId: string;
  readonly challengeId: string;
  readonly userId?: string;
}

export interface IListResultsOutput {
  readonly userId: string;
  readonly challengeId: string;
  readonly campaignId: string;
  readonly departmentId: string;
  readonly userName: string;
  readonly departmentName: string;
  readonly tries: number;
  readonly correct: boolean;
  readonly challengeTitle: string;
  readonly endDate: string;
  readonly finished: boolean;
  readonly impd: number;
  readonly status: IResultStatus;
}

interface IListCampaignChallengesInput {
  readonly userId?: string;
  readonly isPending?: boolean;
}

interface IListCampaignUsersInput {
  readonly campaignId: string;
  readonly challengeId: string;
}

export interface IListCampaignUsersOutput {
  readonly email: string;
  readonly name: string;
  readonly userId: string;
  readonly departmentId: string;
  readonly departmentName: string;
}

export const campaignService = {
  getQuestions(input: IGetChallengesInput): Observable<IQuestion[]> {
    return httpRequest.post<IQuestion[]>('/campaigns/questions/', input).pipe(
      map(response => {
        if (response === undefined || response === null) {
          return [];
        }

        if (response.length === 0) {
          return [];
        }

        return response;
      })
    );
  },
  answer(input: IAnswerCampaignInput): Observable<IAnswerCampaignOutput> {
    return httpRequest.post<IAnswerCampaignOutput>(
      '/campaigns/challenges/answer',
      input
    );
  },
  getUserIMPD(): Observable<IGetUserIMPDOutput> {
    return httpRequest.post('/campaigns/user/result', {});
  },
  listDepartmentIMPD(): Observable<IListDepartmentIMPDOutput[]> {
    return httpRequest.post('/campaigns/department/result', {});
  },
  listResults(input: IListResultsInput): Observable<IListResultsOutput[]> {
    return httpRequest.post<IListResultsOutput[]>(`/campaigns/result/`, input);
  },
  create(input: ICreateCampaignInput) {
    return httpRequest.post<string>('/campaigns', input);
  },
  list(): Observable<IListCampaignOutput[]> {
    return httpRequest.get('/campaigns');
  },
  listUsers(
    input: IListCampaignUsersInput
  ): Observable<IListCampaignUsersOutput[]> {
    return httpRequest.get('/campaigns/users', { query: input });
  },
  listChallenges(
    input: IListCampaignChallengesInput
  ): Observable<IListCampaignChallengesOutput[]> {
    return httpRequest.get<IListCampaignChallengesOutput[]>(
      `/campaigns/challenges`,
      { query: input }
    );
  },
};
