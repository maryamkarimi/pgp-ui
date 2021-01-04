import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Admin from './pages/Admin';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/">
        <Home />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/admin">
        <Admin />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
