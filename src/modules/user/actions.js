import toast from 'react-hot-toast';
import { createAction } from 'redux-actions';
import {
  APIRoutes,
  AppMessages,
  AppRoutes,
  ResponseStatusTexts,
  ToastTypes,
} from '~/constants';
import {
  getBadResponseMsg,
  getToastSetting,
} from '~/utils';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginError = createAction('LOGIN_ERROR');
export const logoutRequest = createAction('LOGOUT_REQUEST');

export const login = ({ email, password, closeModal, navigate }) => {
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

            throw new Error(
              getBadResponseMsg('login', response.statusText)
            );
          }
        })
        .then(() => {
          if (closeModal) {
            closeModal();
            toast.success(
              AppMessages.LOGIN_SUCCESS,
              getToastSetting({ toastType: ToastTypes.SUCCESS }),
            );
          } else {
            navigate(AppRoutes.MAIN);
          }
        })
        .catch(({ message }) => {
          dispatch(loginError(message || AppMessages.DATA_POSTING_ERROR));
        });
    }, 500);
  };
};

export const logout = () => (dispatch) => dispatch(logoutRequest());
