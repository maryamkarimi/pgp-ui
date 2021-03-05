import React from 'react';
import './VerificationTask.less';
import { Row } from 'antd';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';

const VerificationTask = ({ task, handleSubmit }) => {
  return (
    <Row className="submit-buttons">
      <AnimatedIconButton handleSubmit={handleSubmit} type='no' isValidated={() => true}/>
      <AnimatedIconButton handleSubmit={handleSubmit} type='yes' isValidated={() => true}/>
    </Row>
  );
};

export default VerificationTask;
