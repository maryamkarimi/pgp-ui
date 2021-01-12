import React from 'react';
import './NotFound.css';
import { PAGE_NOT_FOUND_TEXT } from '../assets/constants/Constants';

const NotFound = () => {
  return (
    <div className="NotFound text-center">
      <h3>{PAGE_NOT_FOUND_TEXT}</h3>
    </div>
  );
};

export default NotFound;
