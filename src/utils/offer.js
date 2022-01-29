import {
  APIRoutes,
  AppQueryParamsLeading,
  OFFERS_LIMIT_PER_PAGE,
  SortingTypeNames,
} from '~/constants';

export const getOfferCurrency = () => '€';

export const getOfferPricePeriod = () => '/ night';

export const getOfferPricePeriodNoSlash = () => 'night';

export const getOfferURL = (offerId) => (
  `${APIRoutes.OFFERS}?id=${offerId}`
);

export const getOffersNearbyURL = (offerId) => (
  `${APIRoutes.NEARBY}?id=${offerId}`
);

export const getOffersURL = (cityId, sortingType, page = 1) => {
  let sort = '';
  let order = '';

  switch (sortingType) {
    case SortingTypeNames.TO_HIGH:
      sort = '&_sort=price';
      order = '&_order=asc';
      break;
    case SortingTypeNames.TO_LOW:
      sort = '&_sort=price';
      order = '&_order=desc';
      break;
    case SortingTypeNames.TOP_RATED:
      sort = '&_sort=rating';
      order = '&_order=desc';
      break;
  }

  return (
    `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}&_page=${page}&_limit=${OFFERS_LIMIT_PER_PAGE}${sort}${order}`
  );
};
