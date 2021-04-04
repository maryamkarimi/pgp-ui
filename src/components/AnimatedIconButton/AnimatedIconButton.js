import React, { useState } from 'react';
import { RightCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './AnimatedIconButton.less';

const AnimatedIconButton = ({ isValidated, handleSubmit, type }) => {
  const [animate, setAnimate] = useState(false);

  const iconLookup = {
    yes: <CheckCircleOutlined className = {animate ? 'yes-animate' : 'no-icon'}/>,
    no: <CloseCircleOutlined className = {animate ? 'no-animate' : 'no-icon'}/>,
    submit: <RightCircleOutlined className = {animate ? 'yes-animate' : 'no-icon'}/>,
  };

  const submit = () => {
    if (isValidated()) {
      setAnimate(true);
      setTimeout(() => {
        handleSubmit();
        setAnimate(false);
      }, 500);
    }
  };

  return (
    <div
      className={`task-page-btn ${type}-button`} onClick={submit}>
      {iconLookup[type]}
      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </div>
  );
};

export default AnimatedIconButton;
