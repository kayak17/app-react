import { createAction } from 'redux-actions';
import {
  APIRoutes,
  AppMessages,
  ResponseStatusTexts,
} from '~/constants';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginError = createAction('LOGIN_ERROR');
export const logoutRequest = createAction('LOGOUT_REQUEST');

export const login = ({ email, password }) => {
  return (dispatch, _getState, api) => {
    dispatch(loginRequest());

    // setTimeout - for demo only
    setTimeout(() => {
      api.post(APIRoutes.LOGIN, { email, password })
        .then((response) => {
          if (response.statusText === ResponseStatusTexts.OK) {
            dispatch(loginSuccess(response.data));
          } else {
            dispatch(loginError(AppMessages.DATA_POSTING_ERROR));
            throw new Error(AppMessages.DATA_POSTING_ERROR);
          }
        })
        .catch(({ message }) => {
          dispatch(loginError(message || AppMessages.DATA_POSTING_ERROR));
        });
    }, 500);
  };
};

export const logout = () => (dispatch) => dispatch(logoutRequest());