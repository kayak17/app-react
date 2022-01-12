import {
  AppQueryParamsLeading,
  AppRoutes,
} from '~/constants';

export const getLocationLinkByCityId = (cityId) => (
  `${AppRoutes.MAIN}${AppQueryParamsLeading.CITY_ID}${cityId}`
);
