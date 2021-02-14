import React, { useState } from 'react';
import { Row } from 'antd';
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
    <Row className="verification-icons">
      <h4 style={{ display: 'flex' }}>
        <div className="gradient-btn no-button" onClick={animateNoAndSubmit}>
          <CloseCircleOutlined className = {noShake ? 'fa no-animate' : 'fa no-icon'}/>
          <span>No</span>
        </div>
        <div className="gradient-btn yes-button" onClick={animateYesAndSubmit}>
          <CheckCircleOutlined className = {yesShake ? `fa yes-animate` : 'fa yes-icon'}/>
          <span>Yes</span>
        </div>
      </h4>
      {/* <div className="gradient-btn btn-8">*/}
      {/*  <i className="fa fa-print"></i>*/}
      {/*  <span>Skip</span>*/}
      {/* </div>*/}
    </Row>
  );
};

export default VerificationTask;
