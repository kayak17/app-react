import { getUserId } from '../user';
import { addToFavoritesIds, removeFromFavorites } from './actions';
import { ActionTypes } from './constants';
import { getFavorites, getFavoritesIds, getFavoritesIdsAllUsers } from './selectors';

export const updateFavoritesMiddleware = (store) => (next) => (action) => {
  if (action.type === ActionTypes.UPDATE_FAVORITES) {
    const state = store.getState();
    const offerId = action.payload;
    const favorites = getFavorites(state);
    const favoritesIds = getFavoritesIds(state);
    const favoritesIdsAllUsers = getFavoritesIdsAllUsers(state);
    const userId = getUserId(state);

    const isInFavorites = favoritesIds.length ?
      favoritesIds.includes(offerId) : false;

    if (isInFavorites) {
      store.dispatch(removeFromFavorites({
        favoritesIdsAllUsers: {
          ...favoritesIdsAllUsers,
          [userId]: favoritesIds.filter((item) => item !== offerId),
        },
        favoritesIds: favoritesIds.filter((item) => item !== offerId),
        favorites: favorites.filter((item) => item.id !== offerId),
      }));
    } else {
      store.dispatch(addToFavoritesIds({
        favoritesIdsAllUsers: {
          ...favoritesIdsAllUsers,
          [userId]: [...favoritesIds, offerId],
        },
        favoritesIds: [...favoritesIds, offerId],
      }));
    }
  }

  return next(action);
};
