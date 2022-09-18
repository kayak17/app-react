import { useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { getActiveCityName } from '~/modules/main';
import { AppActionTypes } from '~/constants';
import { throwUnknownActionError } from '~/utils';

const useOffersReducer = () => {
  const HOOK_NAME = 'useOffersReducer';
  const activeCityName = useSelector(getActiveCityName);

  const initialState = {
    activeCityName: '',
    data: [],
    headerLink: {},
    totalCount: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.SET_DATA:
        return {
          ...state,
          activeCityName: action.payload.activeCityName,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        };
      case AppActionTypes.SET_SCROLLED_DATA:
        return {
          ...state,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
        };
      default:
        throwUnknownActionError(HOOK_NAME);
    }
  };

  const [offersReducer, dispatch] = useReducer(reducer, initialState);

  const setOffersData = useCallback((payload) => {
    dispatch({
      type: AppActionTypes.SET_DATA,
      payload: {
        activeCityName,
        data: payload.data,
        headerLink: payload.headerLink,
        totalCount: payload.totalCount,
      },
    });
  }, [activeCityName]);

  return {
    dispatch,
    offersReducer,
    setOffersData,
  };
};

export default useOffersReducer;
