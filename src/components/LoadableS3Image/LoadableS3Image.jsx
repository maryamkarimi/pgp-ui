import React, { useState } from 'react';
import { S3Image } from 'aws-amplify-react';
import LoadSpinningIcon from '../LoadSpinningIcon/LoadSpinningIcon';

const LoadableS3Image = ({ imgKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      { !isLoaded && <LoadSpinningIcon/> }
      <S3Image
        style={{ height: '100%', display: isLoaded ? 'flex' : 'none' }}
        imgKey={imgKey}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

export default LoadableS3Image;
