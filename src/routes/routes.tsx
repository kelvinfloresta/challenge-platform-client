import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes as Routing,
} from 'react-router-dom';

import ListCampaigns from '../pages/Campaigns';
import ChallengeResults from '../pages/Campaigns/ChallengeResults/ChallengeResults';
import { FinishNewCampaign } from '../pages/Campaigns/NewCampaign/FinishNewCampaign';
import NewCampaign from '../pages/Campaigns/NewCampaign/NewCampaign';
import UserHistory from '../pages/Campaigns/UserHistory';
import Challenges from '../pages/Challenges';
import Dashboard from '../pages/Dashboard/Dashboard';
import FAQPage from '../pages/FAQ/FAQPage';
import { FinishChallenge } from '../pages/FinishChallenge/FinishChallenge';
import Login from '../pages/Login';
import Forbidden from '../pages/Login/Forbidden';
import ForgotPassword from '../pages/Login/ForgotPassword';
import LoginByToken from '../pages/Login/LoginByToken';
import ResetPassword from '../pages/Login/ResetPassword';
import ErrorSSO from '../pages/Login/SSOError';
import Department from '../pages/Manager/Departments';
import Users from '../pages/Manager/Users';
import { Quiz } from '../pages/Quiz/Quiz';

import { AuthRoute } from './AuthRoute';

const Routes = () => {
  return (
    <Router>
      <Routing>
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/token/:token' element={<LoginByToken />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/error/:error' element={<ErrorSSO />} />
        <Route element={<AuthRoute />}>
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/history' element={<UserHistory />} />
          <Route path='/quiz/:campaign_id/:challenge_id' element={<Quiz />} />
          <Route path='/finish-challenge' element={<FinishChallenge />} />
          <Route path='/faq' element={<FAQPage />} />
        </Route>
        <Route element={<AuthRoute userRole='companyManager' />}>
          <Route path='/users' element={<Users />} />
          <Route path='/departments' element={<Department />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/campaigns' element={<ListCampaigns />} />
          <Route path='/new-campaign' element={<NewCampaign />} />
          <Route path='/finish-new-campaign' element={<FinishNewCampaign />} />
          <Route
            path='/campaigns/:campaignId/:challengeId'
            element={<ChallengeResults />}
          />
        </Route>
        <Route path='*' element={<Login />} />
      </Routing>
    </Router>
  );
};

export default Routes;
