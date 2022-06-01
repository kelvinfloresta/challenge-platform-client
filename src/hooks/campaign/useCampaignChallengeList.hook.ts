import { campaignService } from '../../services/Campaigns.service';
import { makeUseList } from '../hookMakers/makeUseList.hook';

export const useCampaignChallengeList = makeUseList(
  campaignService.listChallenges
);
