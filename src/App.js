import React, { useState, useEffect } from 'react';
import './App.less';
import Routes from './Routes';
import { AppContext } from './libs/contextLib';
import { Auth } from 'aws-amplify';
import { onError } from './libs/errorLib';
import { ADMIN_GROUP, COGNITO_GROUP_FIELD } from './assets/constants/Constants';

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const isAdminSession = (session) => {
    return session.accessToken.payload[COGNITO_GROUP_FIELD] != null &&
           session.accessToken.payload[COGNITO_GROUP_FIELD].includes(ADMIN_GROUP);
  };

  const onLoad = () => {
    Auth.currentSession()
        .then((session) => {
          setIsAdmin(isAdminSession(session));
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
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, isAdmin, setIsAdmin }}>
        <Routes />
      </AppContext.Provider>
    )
  );
};


export default App;
