import React from 'react';
import './VerificationTask.less';
import { Row } from 'antd';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';
import { submitVerificationAnswer } from '../../../services/api/results';

const VerificationTask = ({ task, incrementTask }) => {
  const submitNo = () => {
    submitVerificationAnswer(task['cueImageId'], false).then(() => {});
    incrementTask();
  };

  const submitYes = () => {
    submitVerificationAnswer(task['cueImageId'], true).then(() => {});
    incrementTask();
  };

  return (
    <Row className="submit-buttons">
      <AnimatedIconButton handleSubmit={submitNo} type='no' isValidated={() => true}/>
      <AnimatedIconButton handleSubmit={submitYes} type='yes' isValidated={() => true}/>
    </Row>
  );
};

export default VerificationTask;
