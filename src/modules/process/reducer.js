import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setIsLoading } from './actions';
import { InitialValues } from './constants';

const isLoading = handleActions(
  {
    [setIsLoading]: (_state, action) => action.payload,
  },
  InitialValues.IS_LOADING
);

export default combineReducers({
  isLoading,
});
