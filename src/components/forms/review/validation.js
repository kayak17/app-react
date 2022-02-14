import * as yup from 'yup';
import {
  REVIEW_COMMENT_LENGTH,
  FormValidationMessages,
  ReviewFormRatings,
} from '~/constants';
import { commonFieldRule } from '~/utils';

const marks = Array.from(ReviewFormRatings, (item) => item.mark);

export const reviewSchema = yup.object().shape({
  rating: commonFieldRule
    .oneOf(marks, FormValidationMessages.RATING_STARS_INVALID)
    .required(FormValidationMessages.RATING_STARS_REQUIRED),
  comment: commonFieldRule
    .min(REVIEW_COMMENT_LENGTH, FormValidationMessages.COMMENT_LENGTH),
});
