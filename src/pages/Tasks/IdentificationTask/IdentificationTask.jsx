import React, { useState } from 'react';
import { Row, Select } from 'antd';
import './IdentificationTask.less';

const IdentificationTask = ({ task, handleSubmit }) => {
  const [cues, setCues] = useState([]);

  return (
    <>
      <Select
        mode="tags"
        className={ cues.length <= 4 ? 'select-input' : 'select-input disable-select-input'}
        allowClear
        value={cues}
        filterOption={false}
        tokenSeparators={[',']}
        autoFocus
        maxTagCount='responsive'
        maxTagTextLength={25}
        notFoundContent={''}
        onChange={((value) => setCues(value))}
      />
      <Row className="submit-buttons">
        <div className="gradient-btn submit-button" onClick={handleSubmit}>
          <span>Submit</span>
        </div>
      </Row>
    </>
  );
};

export default IdentificationTask;
