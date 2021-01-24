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
