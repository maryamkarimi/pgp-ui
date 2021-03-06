import { getApiName } from '../index';
import { API } from 'aws-amplify';
import { handleError } from '../handlers';

export const submitVerificationAnswer = (cueImageId, answer) => {
  const body = { id: cueImageId, answer: answer };
  return API
      .post(getApiName(), '/cue-verification', { body })
      .then(handleError);
};

export const submitIdentificationAnswer = (imageId, answers) => {
  const body = { imageId, answers };
  return API
      .post(getApiName(), '/cue-identification', { body })
      .then(handleError);
};
