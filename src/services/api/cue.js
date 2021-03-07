import { getApiName } from '../index';
import { API } from 'aws-amplify';
import { handleError, pullOutJson } from '../handlers';

export const getCues = () => {
  return API
      .get(getApiName(), '/cue/get-cues', {})
      .then(handleError)
      .then(pullOutJson);
};

export const addCues = (cues) => {
  const body = { cues: cues };
  return API
      .post(getApiName(), '/cue/create-cues', { body })
      .then(handleError)
      .then(pullOutJson);
};

export const updateCue = (cue) => {
  const body = { cue };
  return API
      .put(getApiName(), '/cue/update-cue', { body })
      .then(handleError);
};
