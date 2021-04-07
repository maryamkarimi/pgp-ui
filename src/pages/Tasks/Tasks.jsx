import React, { useEffect, useState } from 'react';
import { Col, Popover, Row } from 'antd';
import TaskInstructions from './TaskInstructions/TaskInstructions';
import { InfoCircleFilled } from '@ant-design/icons';
import { getTasks } from '../../services/api/tasks';
import {
  QUESTION_COUNT, TASK_TYPE_DESCRIPTION_IDENTIFICATION,
  TASK_TYPE_DESCRIPTION_VERIFICATION,
  TASK_TYPE_VERIFICATION,
} from '../../assets/constants/Constants';
import './Tasks.less';
import PGPHeader from '../../components/PGPHeader/PGPHeader';
import IdentificationTask from './IdentificationTask/IdentificationTask';
import VerificationTask from './VerificationTask/VerificationTask';

const Tasks = () => {
  // Task Format: { image: 'imageKey', type: 'V', question: 'Can you see a cat in this picture?'}
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((response) => setTasks(response));
  }, []);

  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
  const incrementTaskNumber = () => {
    setCurrentTaskNumber((taskNumber) => {
      // if all of the questions are already answered
      if (taskNumber + 1 === QUESTION_COUNT) {
        getTasks().then((response) => setTasks(response));
        return 0;
      }

      return taskNumber + 1;
    });
  };

  const getCurrentTask = () => {
    return tasks[currentTaskNumber] || '';
  };

  const getTaskTypeDescription = () => {
    return getCurrentTask()['type'] === TASK_TYPE_VERIFICATION ?
        TASK_TYPE_DESCRIPTION_VERIFICATION :
        TASK_TYPE_DESCRIPTION_IDENTIFICATION;
  };

  const getCompletedTaskStatus = () => {
    return completedTaskCount === 1 ?
        `1 Question Completed` :
        `${completedTaskCount} Questions Completed`;
  };

  const incrementTask = () => {
    setCompletedTaskCount((currentNumber) => currentNumber + 1);
    incrementTaskNumber();
  };

  return (
    <div className="tasks-page">
      <PGPHeader/>
      <div className="question-container">

        <Col xs={0} md={9} lg={7} xl={6} className="side-instructions-container">
          <TaskInstructions taskType={getCurrentTask()['type']}/>
        </Col>

        <Col xs={24} md={15} lg={17} xl={18} className="task-container">
          <Row className="task-header">
            <Col className="task-type-container">
              <h6>{getTaskTypeDescription()}</h6>
              <Col md={0}>
                <Popover
                  overlayClassName="info-popover"
                  content={<TaskInstructions/>}
                  trigger="click">
                  <InfoCircleFilled id="info-icon"/>
                </Popover>
              </Col>
            </Col>
            <Col className="progress-text">{getCompletedTaskStatus()}</Col>
          </Row>

          {
            getCurrentTask()['type'] === 'I' ?
              <IdentificationTask incrementTask={incrementTask} task={getCurrentTask()} /> :
              <VerificationTask incrementTask={incrementTask} task={getCurrentTask()} />
          }

          <Row className="skip-btn-container">
            <button className="btn skip-btn" onClick={incrementTaskNumber}>Skip</button>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Tasks;
