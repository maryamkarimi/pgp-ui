import React, { useState } from 'react';
import { Row, Select } from 'antd';
import './IdentificationTask.less';
import { ERROR_CUE_REQUIRED, ERROR_TOO_MANY_CUES } from '../../../assets/constants/Constants';
import AnimatedIconButton from '../../../components/AnimatedIconButton/AnimatedIconButton';
import { submitIdentificationAnswer } from '../../../services/api/results';

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
      <div className="select-container">
        <Select
          mode="tags"
          autoFocus
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
