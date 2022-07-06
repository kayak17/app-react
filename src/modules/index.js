import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counters from './counters';
import favorites from './favorites';
import main from './main';
import offersMap from './offers-map';
import process from './process';
import user from './user';
import { AppReducers, APP_LOCAL_STORAGE_NAME } from '~/constants';

const persistConfig = {
  key: APP_LOCAL_STORAGE_NAME,
  storage,
  whitelist: [
    AppReducers.FAVORITES,
    AppReducers.MAIN,
    AppReducers.USER,
  ],
};

const rootReducer = combineReducers({
  [AppReducers.COUNTERS]: counters,
  [AppReducers.FAVORITES]: favorites,
  [AppReducers.MAIN]: main,
  [AppReducers.OFFERS_MAP]: offersMap,
  [AppReducers.PROCESS]: process,
  [AppReducers.USER]: user,
});

export default persistReducer(persistConfig, rootReducer);
