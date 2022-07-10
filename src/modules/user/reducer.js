import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
} from './actions';
import { InitialValues } from './constants';
import { AuthStatuses } from '~/constants';

const authInfo = handleActions(
  {
    [loginSuccess]: (_state, action) => action.payload,
    [logoutRequest]: () => InitialValues.AUTH_INFO,
  },
  InitialValues.AUTH_INFO
);

const authStatus = handleActions(
  {
    [loginSuccess]: () => AuthStatuses.AUTH,
    [logoutRequest]: () => AuthStatuses.NO_AUTH,
  },
  AuthStatuses.NO_AUTH
);

const isLoading = handleActions(
  {
    [loginRequest]: () => true,
    [loginSuccess]: () => false,
    [loginError]: () => false,
    [logoutRequest]: () => false,
  },
  false
);

const isError = handleActions(
  {
    [loginRequest]: () => InitialValues.ERROR,
    [loginSuccess]: () => InitialValues.ERROR,
    [loginError]: (_state, action) => action.payload,
    [logoutRequest]: () => InitialValues.ERROR,
  },
  InitialValues.ERROR
);

export default combineReducers({
  authInfo,
  authStatus,
  isLoading,
  isError,
});
