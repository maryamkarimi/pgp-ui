import React, { useState } from 'react';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './VerificationTask.less';

const VerificationTask = ({ task, handleSubmit }) => {
  const [yesShake, setYesShake] = useState(false);
  const [noShake, setNoShake] = useState(false);

  const animateYesAndSubmit = () => {
    setYesShake(true);
    setTimeout(() => {
      setYesShake(false);
      handleSubmit();
    }, 800);
  };

  const animateNoAndSubmit = () => {
    setNoShake(true);
    setTimeout(() => {
      setNoShake(false);
      handleSubmit();
    }, 800);
  };

  return (
    <div className="verification-icons">
      <div className="gradient-btn no-button" onClick={animateNoAndSubmit}>
        <CloseCircleOutlined className = {noShake ? 'no-animate' : 'no-icon'}/>
        <span>No</span>
      </div>
      <div className="gradient-btn yes-button" onClick={animateYesAndSubmit}>
        <CheckCircleOutlined className = {yesShake ? `yes-animate` : 'yes-icon'}/>
        <span>Yes</span>
      </div>
    </div>
  );
};

export default VerificationTask;
