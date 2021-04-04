import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const signUpUser = (userInfo) => {
  return API
      .post(getApiName(), '/user/new-user', { ...userInfo });
};
