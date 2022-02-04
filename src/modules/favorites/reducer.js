import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setFavoriteOffersIds } from './actions';
import { InitialModulesValues } from '~/constants';

const favoriteOffersIds = handleActions(
  {
    [setFavoriteOffersIds]: (_state, action) => action.payload,
  },
  InitialModulesValues.FAVORITE_OFFERS_IDS
);

export default combineReducers({
  favoriteOffersIds,
});
