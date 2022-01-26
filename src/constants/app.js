export const APP_DEFAULT_AVATAR = 'img/icon-avatar.svg';
export const APP_LOCAL_STORAGE_NAME = 'myAppRoot';

export const AppActionTypes = {
  ERROR: 'ERROR',
  IDLE: 'IDLE',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  SET_DATA: 'SET_DATA',
  START: 'START',
  UNKNOWN_ACTION_TYPE: 'Unknown action.type in ',
};

export const AppReducers = {
  MAIN: 'MAIN',
  OFFERS_MAP: 'OFFERS_MAP',
  PROCESS: 'PROCESS',
  USER: 'USER',
};

export const AuthStatuses = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
};

export const FetchingStatuses = {
  ERROR: 'ERROR',
  IDLE: 'IDLE',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  START: 'START',
};

export const HttpCodes = {
  UNAUTHORIZED: 401,
};

export const ResponseStatusTexts = {
  CREATED: 'Created',
  OK: 'OK',
};

export const ToastTypes = {
  DEFAULT: 'DEFAULT',
  SUCCESS: 'SUCCESS',
};

export const ToastColors = {
  [ToastTypes.DEFAULT]: '',
  [ToastTypes.SUCCESS]: '#61d345',
};
