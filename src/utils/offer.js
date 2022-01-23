import {
  APIRoutes,
  AppQueryParamsLeading,
} from '~/constants';

export const getOfferCurrency = () => '€';

export const getOfferPricePeriod = () => '/ night';

export const getOffersURL = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}&_limit=7`
);
