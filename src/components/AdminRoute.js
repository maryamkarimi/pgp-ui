import React from 'react';
import AuthenticatedRoute from './AuthenticatedRoute';
import { useAppContext } from '../libs/contextLib';
import NotAuthorized from '../pages/NotAuthorized';

const AdminRoute = ({ children, ...rest }) => {
  const { isAdmin } = useAppContext();

  return (
    <AuthenticatedRoute {...rest}>
      {isAdmin ? children : <NotAuthorized/>}
    </AuthenticatedRoute>
  );
};

export default AdminRoute;
