import { getApiName } from '../index';
import { API } from 'aws-amplify';
import { handleError } from '../handlers';

export const signUpUser = (userInfo) => {
  return API
      .post(getApiName(), '/user/new-user', { ...userInfo })
      .then(handleError);
};
