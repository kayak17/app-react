import { ActionTypes } from './constants';
import { getFavoritesIds } from './selectors';
import { setIsLoading } from '../process';
import { AppMessages, ResponseStatusTexts } from '~/constants';
import { getFavoriteOffersURL, throwErrorToBoundary } from '~/utils';

export const setFavoritesRequest = () => ({
  type: ActionTypes.SET_FAVORITES_REQUEST,
});

export const setFavoritesSuccess = (data) => ({
  type: ActionTypes.SET_FAVORITES_SUCCESS,
  payload: data,
});

export const setFavoritesError = (errorMsg) => ({
  type: ActionTypes.SET_FAVORITES_ERROR,
  payload: errorMsg,
});

export const addToFavoritesIds = (data) => ({
  type: ActionTypes.ADD_TO_FAVORITES_IDS,
  payload: data,
});

export const removeFromFavorites = (data) => ({
  type: ActionTypes.REMOVE_FROM_FAVORITES,
  payload: data,
});

export const updateFavorites = (offerId) => ({
  type: ActionTypes.UPDATE_FAVORITES,
  payload: offerId,
});

export const fetchFavorites = () => {
  return (dispatch, getState, api) => {
    const favoritesIds = getFavoritesIds(getState());
    dispatch(setIsLoading(true));
    dispatch(setFavoritesRequest());

    // setTimeout - for demo only
    setTimeout(() => {
      api.get(getFavoriteOffersURL(favoritesIds))
        .then((response) => {
          if (response.statusText === ResponseStatusTexts.OK) {
            dispatch(setFavoritesSuccess(response.data));
          } else {
            dispatch(setFavoritesError(AppMessages.DATA_LOADING_ERROR));
            throwErrorToBoundary(AppMessages.DATA_LOADING_ERROR);
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        })
        .catch(({ message }) => {
          dispatch(setFavoritesError(message || AppMessages.DATA_LOADING_ERROR));
        });
    }, 500);
  };
};
