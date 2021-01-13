import React from 'react';
import VerificationTask from './VerificationTask';
import IdentificationTask from './IdentificationTask';

const Task = ({ task }) => {
  const taskTypeLookup = {
    V: <VerificationTask task={task}/>,
    I: <IdentificationTask task={task}/>,
  };

  return (
    <>{task === undefined ? '' : taskTypeLookup[task['type']]}</>
  );
};

export default Task;
