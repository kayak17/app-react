import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
} from './actions';
import {
  AuthStatuses,
  InitialModulesValues,
} from '~/constants';

const authInfo = handleActions(
  {
    [loginSuccess]: (_state, action) => action.payload,
    [logoutRequest]: () => InitialModulesValues.AUTH_INFO,
  },
  InitialModulesValues.AUTH_INFO
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
    [loginRequest]: () => InitialModulesValues.ERROR,
    [loginSuccess]: () => InitialModulesValues.ERROR,
    [loginError]: (_state, action) => action.payload,
    [logoutRequest]: () => InitialModulesValues.ERROR,
  },
  InitialModulesValues.ERROR
);

export default combineReducers({
  authInfo,
  authStatus,
  isLoading,
  isError,
});
