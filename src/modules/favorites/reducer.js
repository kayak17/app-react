import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { updateOffersIdsMap } from './actions';
import { InitialModulesValues } from '~/constants';

const offersIdsMap = handleActions(
  {
    [updateOffersIdsMap]: (_state, action) => action.payload,
  },
  InitialModulesValues.FAVORITE_OFFERS_IDS_MAP
);

export default combineReducers({
  offersIdsMap,
});
