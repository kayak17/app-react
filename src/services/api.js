import axios from 'axios';
import { AppMessages, HttpCodes } from '~/constants';

const BACKEND_URL = 'http://localhost:3000/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onRequestSuccess = (config) => {
    // *** for fake backend only
    const { data, headers, method, url } = config;

    if (method === 'post' && url === '/login') {
      headers.auth = {
        email: data.email,
        password: data.password,
        initialRequest: 'login',
      };

      config.method = 'get';
      config.url = '/users';
    }
    // ***

    return config;
  };

  const onRequestFail = (err) => {
    return Promise.reject(err);
  };

  const onResponseSuccess = (response) => {
    // *** for fake backend only
    const { config: { headers }, data } = response;
    const { auth } = headers;

    if (auth && auth.initialRequest === 'login') {
      const filteredUsers = data.filter((user) => {
        return user.email === auth.email && user.password === auth.password;
      });

      if (filteredUsers.length) {
        const user = filteredUsers[0];

        response.data = {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          token: 'fake-jwt-token',
        };
      } else {
        return Promise.reject({
          message: AppMessages.NO_SUCH_USER,
          response: {
            status: '',
          },
        });
      }
    }
    // ***

    return response;
  };

  const onResponseFail = (err) => {
    const { response } = err;

    if (response.status === HttpCodes.UNAUTHORIZED) {
      onUnauthorized();
    }

    return Promise.reject(err);
  };

  api.interceptors.request.use(onRequestSuccess, onRequestFail);
  api.interceptors.response.use(onResponseSuccess, onResponseFail);

  return api;
};
