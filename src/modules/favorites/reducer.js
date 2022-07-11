import { ActionTypes, InitialValues } from './constants';

const initialState = {
  favoritesIdsAllUsers: InitialValues.FAVORITES_IDS_ALL_USERS,
  favoritesIds: InitialValues.FAVORITES_IDS,
  favorites: InitialValues.FAVORITES,
  isLoaded: InitialValues.IS_LOADED,
  errorMsg: InitialValues.ERROR_MSG,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVORITES_REQUEST:
      return {
        ...state,
        isLoaded: InitialValues.IS_LOADED,
        errorMsg: InitialValues.ERROR_MSG,
      };

    case ActionTypes.SET_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
        isLoaded: true,
        errorMsg: null,
      };

    case ActionTypes.SET_FAVORITES_ERROR:
      return {
        ...state,
        isLoaded: false,
        errorMsg: action.payload,
      };

    case ActionTypes.ADD_TO_FAVORITES_IDS:
      return {
        ...state,
        favoritesIdsAllUsers: action.payload.favoritesIdsAllUsers,
        favoritesIds: action.payload.favoritesIds,
      };

    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoritesIdsAllUsers: action.payload.favoritesIdsAllUsers,
        favoritesIds: action.payload.favoritesIds,
        favorites: action.payload.favorites,
      };

    default:
      return state;
  }
};

export default favoritesReducer;
