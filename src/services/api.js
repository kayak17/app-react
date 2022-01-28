import axios from 'axios';
import { store } from '~/store';
import { getAuthInfo } from '~/modules/user';
import { APIRoutes, AppMessages, HttpCodes } from '~/constants';

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

    if (method === 'post' && url === APIRoutes.LOGIN) {
      headers.auth = {
        email: data.email,
        password: data.password,
        initialRequest: 'login',
      };

      config.method = 'get';
      config.url = '/users';
    } else if (method === 'post' && url === APIRoutes.SIGNUP) {
      if (data.password === data.passwordConfirm) {
        data.avatar = 'img/icon-avatar.svg';
        delete data.passwordConfirm;

        config.url = '/users';
      } else {
        return Promise.reject({
          message: AppMessages.PASSWORDS_DONT_MATCH,
          response: {
            status: '',
          },
        });
      }
    } else if (method === 'get' && url.split('?')[0] === APIRoutes.NEARBY) {
      const offerId = parseInt(url.split('?id=')[1], 10);
      const idx = !isNaN(offerId) && offerId;

      if (!idx) {
        return Promise.reject({
          message: AppMessages.INCORRECT_OFFERID,
          response: {
            status: '',
          },
        });
      }

      let idOne, idTwo, idThree = undefined;

      if (
        idx === 1 || idx === 2 || idx === 3 ||
        idx === 19 || idx === 20 || idx === 21
      ) {
        idOne = offerId + 1;
        idTwo = offerId + 2;
        idThree = offerId + 3;
      } else {
        idOne = offerId - 1;
        idTwo = offerId - 2;
        idThree = offerId - 3;
      }

      config.url = `/offers?id=${idOne}&id=${idTwo}&id=${idThree}`;
    } else if (method === 'post' && url.split('?')[0] === APIRoutes.REVIEWS) {
      if (headers.Authorization === 'Bearer fake-jwt-token') {
        const state = store.getState();
        const authInfo = getAuthInfo(state);

        data.avatar = authInfo.avatar;
        data.date = new Date();
        data.name = authInfo.name || authInfo.email;
        data.userId = authInfo.id;
      } else {
        return Promise.reject({
          message: AppMessages.UNAUTHORIZED,
          response: {
            status: '',
          },
        });
      }
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
