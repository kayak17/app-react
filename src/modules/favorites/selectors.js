import find from 'lodash/find';
import { createSelector } from 'reselect';
import { getUserId } from '../user';
import { AppReducers } from '~/constants';

const FAVORITES = AppReducers.FAVORITES;

export const getFavoriteOffersIds = (state) => state[FAVORITES].favoriteOffersIds;

export const getFavoriteOffersIdsByUser = createSelector(
  [getFavoriteOffersIds, getUserId],
  (favoriteOffersIds, userId) => {
    const user = find(favoriteOffersIds, ['userId', userId]);

    return user && user.offers ? user.offers : [];
  }
);
