import React, { useState } from 'react';
import { S3Image } from 'aws-amplify-react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadableS3Image = ({ imgKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadIcon = <LoadingOutlined spin />;
  return (
    <>
      { !isLoaded && <Spin size='large' indicator={loadIcon}/> }
      <S3Image
        style={{ height: '100%', display: isLoaded ? 'flex' : 'none' }}
        imgKey={imgKey}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

export default LoadableS3Image;
