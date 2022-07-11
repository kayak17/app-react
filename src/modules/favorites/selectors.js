import { createSelector } from 'reselect';
import { getUserId } from '../user';
import { AppReducers } from '~/constants';

const FAVORITES = AppReducers.FAVORITES;

export const getFavoritesIdsAllUsers = (state) => {
  return state[FAVORITES].favoritesIdsAllUsers
};

export const getFavoritesIds = createSelector(
  [getFavoritesIdsAllUsers, getUserId],
  (favoritesIdsAllUsers, userId) => {
    return userId && favoritesIdsAllUsers[userId] ? favoritesIdsAllUsers[userId] : [];
  }
);

export const getFavorites = (state) => state[FAVORITES].favorites;
export const getIsLoaded = (state) => state[FAVORITES].isLoaded;
export const getErrorMsg = (state) => state[FAVORITES].errorMsg;
