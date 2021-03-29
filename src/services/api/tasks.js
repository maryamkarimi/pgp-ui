import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const getTasks = () => {
  return API
      .get(getApiName(), '/questions/tasks', { });
};
