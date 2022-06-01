import { challengeService } from '../../services/Challenge.service';
import { makeUseList } from '../hookMakers/makeUseList.hook';

export const useChallengeList = makeUseList(challengeService.list);
