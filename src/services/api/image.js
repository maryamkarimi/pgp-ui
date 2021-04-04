import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const getImages = () => {
  return API
      .get(getApiName(), '/get-images', {});
};

export const addImages = (images) => {
  const body = { images };
  return API
      .post(getApiName(), '/create-images', { body });
};

export const updateImage = (image) => {
  const body = { image };
  return API
      .post(getApiName(), '/update-image', { body });
};
