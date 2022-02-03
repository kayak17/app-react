import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { getUserId } from '../user';
import { AppReducers } from '~/constants';

const FAVORITES = AppReducers.FAVORITES;

export const getOffersIdsMap = (state) => state[FAVORITES].offersIdsMap;

export const getDataByUser = createSelector(
  [getOffersIdsMap, getUserId],
  (offersIdsMap, userId) => {
    if (!isEmpty(offersIdsMap) && userId &&
      Object.keys(offersIdsMap).includes(userId.toString(10))
    ) {
      return offersIdsMap[userId];
    }

    return [];
  }
);
