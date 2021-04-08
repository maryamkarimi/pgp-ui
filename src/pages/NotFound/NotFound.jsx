import React from 'react';
import './NotFound.css';
import { PAGE_NOT_FOUND_TEXT } from '../../assets/constants/Constants';
import { Button, Result } from 'antd';

const NotFound = () => {
  return (
    <div className="NotFound">
      <Result
        status="404"
        title="404"
        subTitle={PAGE_NOT_FOUND_TEXT}
        extra={<Button type="primary">Back Home</Button>}
      />,
    </div>
  );
};

export default NotFound;
