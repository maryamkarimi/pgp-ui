import React, { useState } from 'react';
import { Row, Select } from 'antd';
import './IdentificationTask.less';
import { ERROR_CUE_REQUIRED, ERROR_TOO_MANY_CUES } from '../../../assets/constants/Constants';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';
import { submitIdentificationAnswer } from '../../../services/api/results';
import LoadableS3Image from '../../../components/LoadableS3Image/LoadableS3Image';

const IdentificationTask = ({ task, incrementTask }) => {
  const [cues, setCues] = useState([]);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);

  const submitAnswer = () => {
    submitIdentificationAnswer(task['imageId'], cues).then(() => {});
    incrementTask();
  };

  const isValid = () => {
    if (cues.length === 0) {
      setShowRequiredMessage(true);
    }
    return cues.length > 0 && cues.length <= 5;
  };

  const errorAlert = (errorMessage) => <div className="errorMsg">{errorMessage}</div>;

  return (
    <>
      <h4>{task['question']}</h4>
      <div className="image-container">
        <LoadableS3Image imgKey={task['image']}/>
      </div>
      <div className="select-container">
        <Select
          mode="tags"
          allowClear
          value={cues}
          placeholder='Use single words or short phrases if possible'
          maxTagCount='responsive'
          maxTagTextLength={25}
          open={false}
          notFoundContent={''}
          onChange={((selected) => setCues(selected.filter((item) => item !== '')))}
        >
          {cues.map((cue) =>
            <Select.Option key={cue} value={cue}>{cue}</Select.Option>,
          )}
        </Select>

        {cues.length === 0 && showRequiredMessage && errorAlert(ERROR_CUE_REQUIRED)}
        {cues.length > 5 && errorAlert(ERROR_TOO_MANY_CUES)}
      </div>

      <Row className="submit-buttons">
        <AnimatedIconButton
          isValidated={isValid}
          handleSubmit={submitAnswer}
          type='submit'
        />
      </Row>
    </>
  );
};

export default IdentificationTask;
