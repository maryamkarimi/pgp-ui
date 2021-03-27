import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const getCues = () => {
  return API
      .get(getApiName(), '/cue/get-cues', {});
};

export const insertCues = (cues) => {
  const body = { cues: cues };
  return API
      .post(getApiName(), '/cue/create-cues', { body });
};

export const editCue = (cue) => {
  const body = { ...cue };
  return API
      .post(getApiName(), '/cue/update-cue', { body });
};
