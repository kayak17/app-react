export const APP_LOCAL_STORAGE_NAME = 'myAppRoot';

export const AppActionTypes = {
  ERROR: 'ERROR',
  IDLE: 'IDLE',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  SET_DATA: 'SET_DATA',
  SET_SCROLLED_DATA: 'SET_SCROLLED_DATA',
  START: 'START',
  UNKNOWN_ACTION_TYPE: 'Unknown action.type in ',
};

export const AppReducers = {
  COUNTERS: 'COUNTERS',
  FAVORITES: 'FAVORITES',
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

export const HttpHeaders = {
  X_TOTAL_COUNT: 'x-total-count',
};

export const ResponseStatusTexts = {
  CREATED: 'Created',
  OK: 'OK',
};
