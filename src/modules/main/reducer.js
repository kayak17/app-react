import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  setActiveCity,
  setOffersListType,
  setSortingType,
} from './actions';
import { InitialValues } from './constants';

const activeCity = handleActions(
  {
    [setActiveCity]: (_state, action) => action.payload,
  },
  InitialValues.ACTIVE_CITY
);

const offersListType = handleActions(
  {
    [setOffersListType]: (_state, action) => action.payload,
  },
  InitialValues.OFFERS_LIST_TYPE
);

const sortingType = handleActions(
  {
    [setSortingType]: (_state, action) => action.payload,
  },
  InitialValues.SORTING_TYPE
);

export default combineReducers({
  activeCity,
  offersListType,
  sortingType,
});
