export const REVIEW_AVATAR_ALT = 'Reviews avatar';
export const REVIEW_COMMENT_LENGTH = 50;
export const REVIEW_DATE_FORMAT = 'MMMM yyyy';

export const reviewImgShapes = {
  AVATAR: {
    width: 54,
    height: 54,
  },
  FORM_STAR: {
    width: 37,
    height: 33,
  },
  HELP_STAR: {
    width: 13,
    height: 12,
  },
};

export const ReviewFormRatings = [
  { mark: '5', title: 'perfect' },
  { mark: '4', title: 'good' },
  { mark: '3', title: 'not bad' },
  { mark: '2', title: 'badly' },
  { mark: '1', title: 'terribly' },
];

export const ReviewTitles = {
  NO_REVIEWS: 'No reviews yet',
  DESCRIBE_YOUR_STAY: ' and describe your stay with at least ',
  PLACES_NEARBY: 'Other places in the neighbourhood',
  TEXT_AMOUNT: `${REVIEW_COMMENT_LENGTH} characters`,
  TEXTAREA_PLACEHOLDER: 'Tell how was your stay, what you like and what can be improved',
  TO_SUBMIT_REVIEW: 'To submit review please make sure to click ',
  TO_WRITE_REVIEW: 'To write review please ',
  YOUR_REVIEW: 'Your review',
};

export const ReviewsPerPage = {
  ROOM: 5,
  ALL: '',
};
