import { OFFER_RATING_STAR_WIDTH } from '~/constants';

export const getRatingStarsWidth = (rating) => (
  Math.round(rating) * OFFER_RATING_STAR_WIDTH
);
