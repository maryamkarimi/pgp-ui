import React from 'react';
import './VerificationTask.less';
import { message, Row } from 'antd';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';
import { submitVerificationAnswer } from '../../../services/api/results';
import LoadableS3Image from '../../../components/LoadableS3Image/LoadableS3Image';
import { FAILED_TO_SUBMIT_ERROR } from '../../../assets/constants/Constants';

const VerificationTask = ({ task, incrementTask }) => {
  const submitAnswer = (answer) => {
    submitVerificationAnswer(task['cueImageId'], answer)
        .then(() => incrementTask())
        .catch(() => message.error(FAILED_TO_SUBMIT_ERROR));
  };

  return (
    <>
      <h4>{task['question']}</h4>
      <div className="image-container">
        <LoadableS3Image imgKey={task['image']}/>
      </div>
      <Row className="submit-buttons">
        <AnimatedIconButton
          handleSubmit={() => submitAnswer(false)}
          type='no'
          isValidated={() => true}
        />
        <AnimatedIconButton
          handleSubmit={() => submitAnswer(true)}
          type='yes'
          isValidated={() => true}/>
      </Row>
    </>
  );
};

export default VerificationTask;
