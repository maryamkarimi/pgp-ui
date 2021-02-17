import React, { useState } from 'react';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './VerificationTask.less';
import { Row } from 'antd';

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
    <Row className="submit-buttons">
      <div className="gradient-btn no-button" onClick={animateNoAndSubmit}>
        <CloseCircleOutlined className = {noShake ? 'no-animate' : 'no-icon'}/>
        <span>No</span>
      </div>
      <div className="gradient-btn yes-button" onClick={animateYesAndSubmit}>
        <CheckCircleOutlined className = {yesShake ? `yes-animate` : 'yes-icon'}/>
        <span>Yes</span>
      </div>
    </Row>
  );
};

export default VerificationTask;
