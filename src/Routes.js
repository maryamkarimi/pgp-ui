import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Admin from './pages/Admin/Admin';
import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Tasks from './pages/Tasks/Tasks';
import Cues from './pages/Admin/Cues/Cues';
import Images from './pages/Admin/Images/Images';
import {
  ADMIN_CUES,
  ADMIN_HOME,
  ADMIN_IMAGES,
  PARTICIPANT_HOME,
} from './assets/constants/Constants';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute exact path="/">
          <Home />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path={PARTICIPANT_HOME}>
          <Tasks/>
        </AuthenticatedRoute>
        <AdminRoute exact path={ADMIN_HOME}>
          <Admin />
        </AdminRoute>
        <AdminRoute exact path={ADMIN_IMAGES}>
          <Images/>
        </AdminRoute>
        <AdminRoute exact path={ADMIN_CUES}>
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
