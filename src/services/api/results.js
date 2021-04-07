import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const submitVerificationAnswer = (id, answer) => {
  const body = { id, answer };
  return API
      .post(getApiName(), '/verification/cue-tasks', { body });
};

export const submitIdentificationAnswer = (imageId, answers) => {
  const body = { imageId, answers };
  return API
      .post(getApiName(), '/identification/identification-answer', { body });
};
