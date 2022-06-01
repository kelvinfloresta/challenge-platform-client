import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';

import App from './App';
import { config } from './config';
import reportWebVitals from './reportWebVitals';
import './index.css';

if (config.googleAnalytics) {
  ReactGA.initialize(config.googleAnalytics);
  ReactGA.send('pageview');
}

Sentry.init({
  dsn: config.sentryDSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
