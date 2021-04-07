import { getApiName } from '../index';
import { API } from 'aws-amplify';

export const getImages = () => {
  return API
      .get(getApiName(), '/image/get-images', {});
};

export const addImage = (key) => {
  const body = { key };
  return API
      .post(getApiName(), '/image/create-image', { body });
};

export const updateImage = (image) => {
  const body = { image };
  return API
      .post(getApiName(), '/image/update-image', { body });
};
