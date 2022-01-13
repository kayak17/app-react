import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setActiveCity } from './actions';
import { InitialModulesValues } from '~/constants';

const activeCity = handleActions(
  {
    [setActiveCity]: (_state, action) => action.payload,
  },
  InitialModulesValues.ACTIVE_CITY
);

export default combineReducers({
  activeCity,
});
