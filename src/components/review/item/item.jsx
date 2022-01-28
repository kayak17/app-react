import RatingStars from '~/components/rating/stars/stars';
import {
  REVIEW_AVATAR_ALT,
  REVIEW_AVATAR_IMG_SHAPES,
  RatingTypes,
} from '~/constants';
import { reviewPropTypes } from '~/prop-types';
import { getReviewDate } from '~/utils';

const ReviewItem = ({ review }) => {
  return (
    <li className="d-flex mb-3">
      <div className="d-flex flex-column">
        <div>
          <img
            src={review.avatar}
            width={REVIEW_AVATAR_IMG_SHAPES.width}
            height={REVIEW_AVATAR_IMG_SHAPES.height}
            alt={REVIEW_AVATAR_ALT}
          />
        </div>
        <span className="mt-1 fs-6-1">{review.name}</span>
      </div>
      <div className="px-4 text-start">
        <div className="mb-2">
          <RatingStars
            rating={review.rating}
            ratingType={RatingTypes.REVIEW}
          />
        </div>
        <p className="mb-2 lh-md">{review.comment}</p>
        <time
          className="d-block text-muted fs-6-2"
          dateTime={review.date}
        >
          {getReviewDate(review.date)}
        </time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: reviewPropTypes,
};

export default ReviewItem;
