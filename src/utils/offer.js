import {
  APIRoutes,
  AppQueryParamsLeading,
} from '~/constants';

export const getOffersURLByCity = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}`
);
