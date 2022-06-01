import { config } from '../../config';

import AxiosObservableAdapter from './AxiosObservable.adapter';
import IHttpRequest from './IHttpRequest.adapter';

const { host } = config;

const httpRequest: IHttpRequest = new AxiosObservableAdapter(host);

export default httpRequest;
