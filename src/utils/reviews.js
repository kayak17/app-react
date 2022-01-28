import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { REVIEW_DATE_FORMAT } from '~/constants';

export const getReviewDate = (date) => (
  format(parseISO(date), REVIEW_DATE_FORMAT)
);
