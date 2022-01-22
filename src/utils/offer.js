import {
  APIRoutes,
  AppQueryParamsLeading,
} from '~/constants';

export const getOfferPriceTitle = (price) => (
  `€ ${price} / night`
);

export const getOffersURL = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}&_limit=7`
);
