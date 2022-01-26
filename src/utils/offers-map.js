import {
  APIRoutes,
  AppQueryParamsLeading,
  OfferSrTitles,
} from '~/constants';
import {
  getOfferCurrency,
  getOfferPricePeriod,
  getRatingStarsWidth,
} from '~/utils';
import '~/components/rating/stars/stars.less';

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
