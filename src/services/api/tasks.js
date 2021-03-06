import { getApiName } from '../index';
import { API } from 'aws-amplify';
import { handleError, pullOutJson } from '../handlers';

export const getTasks = () => {
  return API
      .get(getApiName(), 'questions/tasks', { })
      .then(handleError)
      .then(pullOutJson);
};
