import isEmpty from 'lodash/isEmpty';
import {
  OfferSrTitles,
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  OFFER_CURRENCY,
  OFFER_PRICE_PERIOD,
} from '~/constants';
import {
  getRatingStarsWidth,
} from '~/utils';
import '~/components/rating/stars/stars.less';

const DELTA = 0.2;

export const getMapCenterAndZoom = (activeCity) => {
  let center = MAP_CENTER_DEFAULT;
  let zoom = MAP_ZOOM_DEFAULT;

  if (!isEmpty(activeCity)) {
    center = [
      activeCity.coordinates[0] - DELTA,
      activeCity.coordinates[1] - DELTA
    ];
    zoom = activeCity.zoom;
  }

  return { center, zoom };
};

export const getMapTooltipMarkup = ({ price, rating, title, type: flatType }) => {
  return `
      <b>${title}</b><br />
      <span>${OFFER_CURRENCY} ${price} ${OFFER_PRICE_PERIOD}</span>,
      <span>${flatType}</span><br />
      <span class="offer-card-rating rating justify-content-center">
        <span class="offer-card-stars rating-stars">
          <span style="width: ${getRatingStarsWidth(rating)}%;" />
          <span className="visually-hidden">${OfferSrTitles.RATING}</span>
        </span>
      </span>
    `;
};

export const getOffersMapURL = (cityId) => (
  `${APIRoutes.OFFERS}${AppQueryParamsLeading.CITY_ID}${cityId}`
);
