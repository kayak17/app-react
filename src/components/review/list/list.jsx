import ReviewItem from '../item/item';
import { reviewsPropTypes } from '~/prop-types';

const ReviewsList = ({ reviews }) => {
  return (
    <ul className="list-unstyled">
      {reviews.map((item) => (
        <ReviewItem
          key={item.id}
          review={item}
        />
      ))}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: reviewsPropTypes,
};

export default ReviewsList;
