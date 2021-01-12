import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import { ADMIN_HOME, LOGIN_PAGE, PARTICIPANT_HOME } from '../assets/constants/Constants';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function UnauthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, isAdmin } = useAppContext();
  const redirect = querystring('redirect');
  const [redirectLocation, setRedirectLocation] = useState(LOGIN_PAGE);

  useEffect(() => {
    setRedirectLocation(isAdmin ? ADMIN_HOME : PARTICIPANT_HOME);
  });

  return (
    <Route {...rest}>
      {!isAuthenticated ? (
          children
        ) : (
          <Redirect to={redirect === '' || redirect === null ? redirectLocation : redirect} />
        )}
    </Route>
  );
};

