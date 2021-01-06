import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';

const Cues = () => {
  const [cues, setCues] = useState([]);
  const [inputCue, setInputCue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  // const addCue = (cue) => {
  //   // call API to upload image, once have the url add it to the list
  //   setCues((currentCues) => [...currentCues, cue]);
  // };

  useEffect(() => {
    setCues(['cat', 'dog']);
  }, []);

  const showInput = () => {
    setInputVisible(true);
  };

  const addCue = () => {
    if (inputCue && cues.indexOf(inputCue) === -1) {
      setCues((currentCues) => [...currentCues, inputCue]);
    }

    setInputVisible(false);
    setInputCue('');
  };

  const handleInputChange = (e) => {
    setInputCue(e.target.value);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      {cues.map((cue) => <Tag closable key={cue}>{cue}</Tag>)}

      {inputVisible && (
        <Input
          // ref={this.saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputCue}
          onChange={handleInputChange}
          onBlur={addCue}
          onPressEnter={addCue}
        />
      )}
      {!inputVisible && (
        <Tag style={{ borderStyle: 'dashed' }} onClick={showInput} >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default Cues;
