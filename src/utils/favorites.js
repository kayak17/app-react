import { APIRoutes } from '~/constants';

export const getFavoriteOffersURL = (offersByUser) => (
  `${APIRoutes.OFFERS}?id=${offersByUser.join('&id=')}`
);
