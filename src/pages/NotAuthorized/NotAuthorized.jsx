import React from 'react';
import { NOT_AUTHORIZED_TEXT } from '../../assets/constants/Constants';
import { Button, Result } from 'antd';
import './NotAuthorized.less';

const NotAuthorized = () => {
  return (
    <div className="not-authorized">
      <Result
        status="403"
        title="403"
        subTitle={NOT_AUTHORIZED_TEXT}
        extra={<Button type="primary" href='/'>Back Home</Button>}
      />
    </div>
  );
};

export default NotAuthorized;
