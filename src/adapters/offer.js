import { ROOM_MAX_PHOTOS_COUNT } from '~/constants';

export const adaptOffer = (offer) => {
  offer.features = {
    bedrooms: offer.bedrooms,
    type: offer.type,
  };
  offer.photos = offer.photos.slice(0, ROOM_MAX_PHOTOS_COUNT);

  return offer;
};
