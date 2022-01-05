import { combineReducers } from 'redux';
import { AppReducers } from '~/constants';
import user from './user';

const rootReducer = combineReducers({
  [AppReducers.USER]: user,
});

export default rootReducer;
