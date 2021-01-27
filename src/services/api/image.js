import { getApiName } from '../index';
import { API } from 'aws-amplify';
import { handleError, pullOutJson } from '../handlers';

export const getImages = () => {
  return API
      .get(getApiName(), '/get-images', {})
      .then(handleError)
      .then(pullOutJson);
};

export const addImages = (images) => {
  const body = { images };
  return API
      .post(getApiName(), '/create-images', { body })
      .then(handleError)
      .then(pullOutJson);
};

export const updateImage = (image) => {
  const body = { image };
  return API
      .put(getApiName(), '/update-image', { body })
      .then(handleError);
};
