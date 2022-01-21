import {
  APIRoutes,
  AppQueryParamsLeading,
} from '~/constants';

export const getOffersURLByCityId = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}&_limit=7`
);
