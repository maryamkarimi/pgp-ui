import React from 'react';
import VerificationTask from '../VerificationTask/VerificationTask';
import IdentificationTask from '../IdentificationTask/IdentificationTask';
import './Task.less';

const Task = ({ task, handleSubmit }) => {
  const taskTypeLookup = {
    V: <VerificationTask task={task} handleSubmit={handleSubmit}/>,
    I: <IdentificationTask task={task} handleSubmit={handleSubmit}/>,
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
