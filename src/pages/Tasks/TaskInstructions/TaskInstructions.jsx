import React from 'react';
import './TaskInstructions.less';
import {
  IDENTIFICATION_INSTRUCTIONS,
  VERIFICATION_INSTRUCTIONS,
} from '../../../assets/constants/Instructions';
import { TASK_TYPE_VERIFICATION } from '../../../assets/constants/Constants';

const TaskInstructions = ({ taskType }) => {
  const instructions = taskType === TASK_TYPE_VERIFICATION ?
      VERIFICATION_INSTRUCTIONS :
      IDENTIFICATION_INSTRUCTIONS;

  return (
    <div className="instructions">
      <h4 id="instructions-header">Instructions</h4>
      <ul>
        {
          instructions.map((instruction) =>
            <li key={instruction}>
              <h6 className="instruction">
                {instruction}
              </h6>
            </li>,
          )
        }
      </ul>
    </div>
  );
};

export default TaskInstructions;
