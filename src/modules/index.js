import { combineReducers } from 'redux';
import { AppReducers } from '~/constants';
import main from './main';
import process from './process';
import user from './user';

const rootReducer = combineReducers({
  [AppReducers.MAIN]: main,
  [AppReducers.PROCESS]: process,
  [AppReducers.USER]: user,
});

export default rootReducer;
