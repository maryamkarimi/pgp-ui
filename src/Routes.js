import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Tasks from './pages/Tasks';

const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/">
        <Home />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/survey">
        <Tasks/>
      </AuthenticatedRoute>
      <AdminRoute exact path="/admin">
        <Admin />
      </AdminRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
