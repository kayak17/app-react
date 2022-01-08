import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setIsLoading } from './actions';

const isLoading = handleActions(
  {
    [setIsLoading]: (_state, action) => action.payload,
  },
  false
);

export default combineReducers({
  isLoading,
});
