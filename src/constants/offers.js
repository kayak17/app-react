export const OFFER_RATING_STAR_WIDTH = 20;
export const OFFERS_LIST_TYPE_ARIA_LABEL = 'offers list style change';

export const OfferClasses = {
  MAIN: {
    li: 'col',
    container: '',
    img: 'offer-card-img',
    info: '',
  },
  ROOM: {
    li: 'col-6 offer-card-column',
    container: 'flex-column',
    img: 'offer-card-img',
    info: 'px-2',
  },
  FAVORITE: {
    li: 'col',
    container: '',
    img: 'offer-card-img-sm',
    info: '',
  },
};

export const OfferImgShapes = {
  MAIN: {
    width: 260,
    height: 200,
  },
  ROOM: {
    width: 260,
    height: 200,
  },
  FAVORITE: {
    width: 156,
    height: 120,
  },
};

export const OfferTitles = {
  FREE_WI_FI: 'Free Wi-Fi',
  NO_PLACES_TO_STAY_IN: 'No places to stay available at the moment in ',
  PLACE_IMAGE: 'Place image',
  PLACES_TO_STAY_IN: ' places to stay in ',
};

export const OfferSrTitles = {
  RATING: 'Rating',
};

export const OfferStyleTypes = {
  ROW: 'row',
  COLUMN: 'column',
};

export const OfferClassesTypes = {
  [OfferStyleTypes.ROW]: 'MAIN',
  [OfferStyleTypes.COLUMN]: 'ROOM',
};
