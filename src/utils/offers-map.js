import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import {
  APIRoutes,
  AppQueryParamsLeading,
  OfferSrTitles,
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
} from '~/constants';
import {
  getOfferCurrency,
  getOfferPricePeriod,
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
      <span>${getOfferCurrency()} ${price} ${getOfferPricePeriod()}</span>,
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
