import React, { useState } from 'react';
import { Row } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import './VerificationTask.less';

const VerificationTask = ({ task, handleSubmit }) => {
  const [yesShake, setYesShake] = useState(false);
  const [noShake, setNoShake] = useState(false);

  const animateYesAndSubmit = () => {
    setYesShake(true);
    setTimeout(() => {
      setYesShake(false);
      handleSubmit();
    }, 1000);
  };

  const animateNoAndSubmit = () => {
    setNoShake(true);
    setTimeout(() => {
      setNoShake(false);
      handleSubmit();
    }, 1000);
  };

  return (
    <Row className="verification-icons">
      <h1>
        <CloseCircleFilled
          className = {noShake ? 'no-icon no-animate' : 'no-icon'}
          onClick={animateNoAndSubmit}
        />
        <CheckCircleFilled
          className = {yesShake ? `yes-icon yes-animate` : 'yes-icon'}
          onClick={animateYesAndSubmit}
        />
      </h1>
    </Row>
  );
};

export default VerificationTask;
