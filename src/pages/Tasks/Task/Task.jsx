import React from 'react';
import VerificationTask from '../VerificationTask/VerificationTask';
import IdentificationTask from '../IdentificationTask/IdentificationTask';
import './Task.less';

const Task = ({ task, incrementTask }) => {
  const taskTypeLookup = {
    V: <VerificationTask task={task} incrementTask={incrementTask}/>,
    I: <IdentificationTask task={task} incrementTask={incrementTask}/>,
  };

  return (
    <>
      <h4>{task['question']}</h4>
      <div className="image-container">
        <div className="image-wrapper">
          <img alt="pgp" src={task['image']}/>
        </div>
      </div>
      {taskTypeLookup[task['type']]}
    </>
  );
};

export default Task;
