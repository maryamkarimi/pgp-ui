import React, { useEffect, useState } from 'react';
import Task from './Task';
import { Col } from 'antd';
import './Tasks.less';
import { QUESTION_COUNT } from '../../assets/constants/Constants';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const mockData = [
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 1: Question1: is there a cat in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png', type: 'V', question: 'SET 1: Question3: is there a dog in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 1: Question4: Enter 5 of your favourite fruits' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 1: Question5: is there a giraffe in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 1: Question6: is there a cat in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 1: Question7: Enter 5 of your favourite food' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 1: Question8: is there a dog in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 1: Question9: Enter 5 of your favourite fruits' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 1: Question10: is there a giraffe in this image?' },
  ];

  const newTasks = [
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question1: is there a cat in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 2: Question2: Enter 5 of your favourite food' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question3: is there a dog in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 2: Question4: Enter 5 of your favourite fruits' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question5: is there a giraffe in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question6: is there a cat in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 2: Question7: Enter 5 of your favourite food' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question8: is there a dog in this image?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'I', question: 'SET 2: Question9: Enter 5 of your favourite fruits' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/peppers.png', type: 'V', question: 'SET 2: Question10: is there a giraffe in this image?' }];

  useEffect(() => {
    // make service call
    setTasks(mockData);
  }, []);

  const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
  const incrementTaskNumber = () => {
    setCurrentTaskNumber((taskNumber) => {
      if (taskNumber + 1 === QUESTION_COUNT) {
        setTasks(nextTasks);
        setNextTasks([]);
        return 0;
      }

      // if already answered half of the questions,
      // make an API call and have the second second of questions ready
      if (taskNumber === QUESTION_COUNT / 2) {
        setNextTasks(newTasks);
      }

      return taskNumber + 1;
    });
  };

  const getCurrentTask = () => {
    return tasks[currentTaskNumber];
  };

  const handleSubmit = () => {
    incrementTaskNumber();
    submitResult();
  };

  // eslint-disable-next-line no-unused-vars
  const submitResult = () => {
    console.log('should submit result here!');
  };

  return (
    <>
      <section className="tasks">
        <Col
          xs={{ offset: 2, span: 20 }}
          md={{ offset: 4, span: 16 }}
          className="question-container">
          <Task task={getCurrentTask() || ''} handleSubmit={handleSubmit}/>
        </Col>
      </section>
    </>
  );
};

export default Tasks;
