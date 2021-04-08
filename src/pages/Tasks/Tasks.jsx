import React, { useEffect, useState } from 'react';
import PGPHeader from '../../components/PGPHeader/PGPHeader';
import NonEmptyTasks from './NonEmptyTasks';
import { Empty } from 'antd';
import { getTasks } from '../../services/api/tasks';
import { NO_TASKS_LEFT } from '../../assets/constants/Constants';
import LoadSpinningIcon from '../../components/LoadSpinningIcon/LoadSpinningIcon';
import './Tasks.less';

const Tasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Task Format: { image: 'imageKey', type: 'V', question: 'Can you see a cat in this picture?'}
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((response) => {
      setTasks(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="tasks-page">
      <PGPHeader/>
      <div className="question-container">

        { isLoading &&
        <div className="tasks-loading"><LoadSpinningIcon/></div>
        }

        { !isLoading && tasks.length === 0 &&
        <div className="no-tasks">
          <Empty description={NO_TASKS_LEFT} />
        </div>
        }

        { !isLoading && tasks.length > 0 &&
        <NonEmptyTasks tasks={tasks} setTasks={setTasks}/>
        }

      </div>
    </div>
  );
};

export default Tasks;
