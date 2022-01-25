import {
  APIRoutes,
  AppQueryParamsLeading,
} from '~/constants';

export const getOffersMapURL = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}`
);
