import React from 'react';
import VerificationTask from './VerificationTask';
import IdentificationTask from './IdentificationTask';
import { Card, Col } from 'antd';
import './Task.less';

const Task = ({ task, handleSubmit }) => {
  const taskTypeLookup = {
    V: <VerificationTask task={task} handleSubmit={handleSubmit}/>,
    I: <IdentificationTask task={task} handleSubmit={handleSubmit}/>,
  };

  return (
    <Card className="task-container" bordered={false}>
      <Col className="card-container">

        <h4>{task['question']}</h4>

        <div className="image-container">
          <div className="image-wrapper">
            <img src={task['image']}/>
          </div>
        </div>

        {taskTypeLookup[task['type']]}
      </Col>
    </Card>
  );
};

export default Task;
