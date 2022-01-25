import { combineReducers } from 'redux';
import { AppReducers } from '~/constants';
import main from './main';
import offersMap from './offers-map';
import process from './process';
import user from './user';

const rootReducer = combineReducers({
  [AppReducers.MAIN]: main,
  [AppReducers.OFFERS_MAP]: offersMap,
  [AppReducers.PROCESS]: process,
  [AppReducers.USER]: user,
});

export default rootReducer;
