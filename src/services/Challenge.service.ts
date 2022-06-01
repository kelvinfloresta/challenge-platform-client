import { Observable } from 'rxjs';

import httpRequest from '../adapters/HttpRequest';

export interface IListChallengesOutput {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly segment: string;
  readonly media: string;
}

export const challengeService = {
  list(): Observable<IListChallengesOutput[]> {
    return httpRequest.get('/challenges');
  },
};
