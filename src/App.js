import React, { useState, useEffect } from 'react';
import './App.less';
import Routes from './Routes';
import { AppContext } from './libs/contextLib';
import { Auth } from 'aws-amplify';
import { onError } from './libs/errorLib';

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    Auth.currentSession()
        .then(() => {
          userHasAuthenticated(true);
        })
        .catch((e) => {
          if (e !== 'No current user') {
            onError(e);
          }
        });

    setIsAuthenticating(false);
  };

  return (
    !isAuthenticating && (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    )
  );
};


export default App;
