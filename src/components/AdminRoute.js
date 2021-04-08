import React from 'react';
import AuthenticatedRoute from './AuthenticatedRoute';
import { useAppContext } from '../libs/contextLib';
import NotAuthorized from '../pages/NotAuthorized/NotAuthorized';
import PGPHeader from './PGPHeader/PGPHeader';

const AdminRoute = ({ children, ...rest }) => {
  const { isAdmin } = useAppContext();

  return (
    <AuthenticatedRoute {...rest}>
      {isAdmin ? children : <><PGPHeader/><NotAuthorized/></>}
    </AuthenticatedRoute>
  );
};

export default AdminRoute;
