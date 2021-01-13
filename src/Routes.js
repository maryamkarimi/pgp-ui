import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Cues from './pages/Cues/Cues';
import Images from './pages/Images/Images';
import Tasks from './pages/Tasks/Tasks';

const Routes = () => {
  return (
    <Router>
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
        <AdminRoute exact path="/admin/images">
          <Images/>
        </AdminRoute>
        <AdminRoute exact path="/admin/cues">
          <Cues/>
        </AdminRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
