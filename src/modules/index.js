import { combineReducers } from 'redux';
import { AppReducers } from '~/constants';
import process from './process';
import user from './user';

const rootReducer = combineReducers({
  [AppReducers.PROCESS]: process,
  [AppReducers.USER]: user,
});

export default rootReducer;
