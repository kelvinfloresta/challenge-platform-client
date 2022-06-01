import React from 'react';

import { GlobalStyle } from './global.style';
import { IMPDProvider } from './hooks/campaign/impd.context';
import Routes from './routes';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <IMPDProvider>
        <Routes />
      </IMPDProvider>
    </>
  );
};

export default App;
