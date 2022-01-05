import axios from 'axios';
import { HttpCodes } from '~/constants';

const BACKEND_URL = 'http://localhost:3000/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onResponseSuccess = (response) => {
    return response;
  };

  const onResponseFail = (err) => {
    const { response } = err;

    if (response.status === HttpCodes.UNAUTHORIZED) {
      onUnauthorized();
    }

    return Promise.reject(err);
  };

  api.interceptors.response.use(onResponseSuccess, onResponseFail);

  return api;
};
