import React from 'react';
import { INSTRUCTIONS } from '../../../assets/constants/Constants';
import './TaskInstructions.less';

const TaskInstructions = () => {
  return (
    <div className="instructions">
      <h4 id="instructions-header">Instructions</h4>
      <ul>
        {
          INSTRUCTIONS.map((instruction) =>
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
