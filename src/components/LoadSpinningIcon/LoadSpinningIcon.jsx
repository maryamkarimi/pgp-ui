import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadSpinningIcon = () => {
  const loadIcon = <LoadingOutlined spin />;
  return (
    <Spin size='large' indicator={loadIcon}/>
  );
};

export default LoadSpinningIcon;
