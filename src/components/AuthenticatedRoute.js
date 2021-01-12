import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import PGPHeader from './PGPHeader/PGPHeader';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
          <>
            <PGPHeader/>
            {children}
          </>
            ) : (
                <Redirect to={
                  `/?redirect=${pathname}${search}`
                } />
            )}
    </Route>
  );
};

export default AuthenticatedRoute;
