import { AppReducers, AuthStatuses } from '~/constants';

const USER = AppReducers.USER;

export const getAuthInfo = (state) => state[USER].authInfo;
export const getAuthStatus = (state) => state[USER].authStatus;
export const getIsLoading = (state) => state[USER].isLoading;
export const getIsError = (state) => state[USER].isError;

export const getIsAuth = (state) => (
  state[USER].authStatus === AuthStatuses.AUTH
);

export const getAuthToken = (state) => (
  state[USER].authInfo && state[USER].authInfo.token
);

export const getUserId = (state) => (
  state[USER].authInfo && state[USER].authInfo.id
);
