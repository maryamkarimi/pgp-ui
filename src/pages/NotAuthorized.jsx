import React from 'react';
import './NotFound.css';
import { NOT_AUTHORIZED_TEXT } from '../assets/constants/Constants';

const NotAuthorized = () => {
  return (
    <div>
      <h3>{NOT_AUTHORIZED_TEXT}</h3>
    </div>
  );
};

export default NotAuthorized;
