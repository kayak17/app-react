import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {
  APIRoutes,
  ReviewsPerPage,
  REVIEW_DATE_FORMAT,
} from '~/constants';

export const getReviewDate = (date) => (
  format(parseISO(date), REVIEW_DATE_FORMAT)
);

export const getReviewsURL = (offerId, pageType) => (
  `${APIRoutes.REVIEWS}?offerId=${offerId}&_page=1&_limit=${ReviewsPerPage[pageType]}&_sort=date&_order=desc`
);
