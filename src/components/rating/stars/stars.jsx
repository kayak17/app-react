import PropTypes from 'prop-types';
import { OfferSrTitles, RatingClasses } from '~/constants';
import { getRatingStarsWidth } from '~/utils';
import './stars.less';

const RatingStars = ({ rating, ratingType, showValue = false }) => {
  return (
    <div className={`${RatingClasses[ratingType]['rating']} rating`}>
      <div className={`${RatingClasses[ratingType]['stars']} rating-stars`}>
        <span style={{ width: `${getRatingStarsWidth(rating)}%` }} />
        <span className="visually-hidden">{OfferSrTitles.RATING}</span>
      </div>
      {showValue && (
        <span className={`${RatingClasses[ratingType]['value']}`}>
          {rating}
        </span>
      )}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingType: PropTypes.string.isRequired,
  showValue: PropTypes.bool,
};

export default RatingStars;
