import React, { useEffect, useState } from 'react';
import { message, Row, Select } from 'antd';
import './IdentificationTask.less';
import {
  CUE_IDENTIFICATION_LABEL,
  ERROR_CUE_REQUIRED,
  ERROR_TOO_MANY_CUES,
  FAILED_TO_SUBMIT_ERROR,
  MAX_CUE_LENGTH,
} from '../../../assets/constants/Constants';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';
import { submitIdentificationAnswer } from '../../../services/api/results';
import LoadableS3Image from '../../../components/LoadableS3Image/LoadableS3Image';

const IdentificationTask = ({ task, incrementTask }) => {
  const [cues, setCues] = useState([]);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);

  useEffect(() => {
    setCues([]);
    setShowRequiredMessage(false);
  }, [task]);

  const submitAnswer = () => {
    submitIdentificationAnswer(task['imageId'], cues)
        .then(() => incrementTask())
        .catch(() => message.error(FAILED_TO_SUBMIT_ERROR));
  };

  const invalidCues = () => cues.filter((cue) => cue.length > MAX_CUE_LENGTH);

  const getCueLengthErrorMessage = () => {
    const invalid = invalidCues();
    const length = invalid.length;

    if (length === 0) return null;

    const firstInvalidCue = invalid[0].substr(0, 20);
    if (length === 1) {
      return `"${firstInvalidCue}..." is longer than ${MAX_CUE_LENGTH} characters.`;
    } else {
      return `"${firstInvalidCue}..." and ${length - 1} more are 
              longer than ${MAX_CUE_LENGTH} characters.`;
    }
  };

  const isValid = () => {
    if (cues.length === 0) {
      setShowRequiredMessage(true);
    }
    return cues.length > 0 && cues.length <= 5 && invalidCues().length === 0;
  };

  const errorAlert = (errorMessage) => <div className="errorMsg">{errorMessage}</div>;

  return (
    <>
      <h4>{task['question']}</h4>
      <div className="image-container">
        <LoadableS3Image imgKey={task['image']}/>
      </div>
      <label>{CUE_IDENTIFICATION_LABEL}</label>
      <div className="select-container">
        <Select
          mode="tags"
          allowClear
          autoFocus
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
        {errorAlert(getCueLengthErrorMessage())}
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
