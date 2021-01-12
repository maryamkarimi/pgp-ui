import React from 'react';
import { Route, Redirect, useLocation, useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import logo from '../images/pgp-logo-black2.PNG';
import { Button, Layout } from 'antd';
import { Auth } from 'aws-amplify';

const { Header } = Layout;

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const history = useHistory();

  const handleLogout = () => {
    Auth.signOut().then(() => {
      userHasAuthenticated(false);
      history.push('/');
    });
  };

  return (
    <Route {...rest}>
      {isAuthenticated ? (
          <>
            <Header className="header">
              <Link to="/">
                <img src={logo} alt="" className="header-logo" />
              </Link>
              {isAuthenticated && <Button type='link' onClick={handleLogout}>Log out</Button>}
            </Header>
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
