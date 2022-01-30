import PropTypes from 'prop-types';
import { RatingClasses } from '~/constants';
import '../stars/stars.less';

const RatingStarsPlaceholder = ({ ratingType, showValue = false }) => {
  return (
    <div className={`${RatingClasses[ratingType]['rating']} rating`}>
      <div className={`${RatingClasses[ratingType]['stars']} rating-stars`}></div>
      {showValue && (
        <span
          className={`${RatingClasses[ratingType]['value']} bg-light placeholder`}
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      )}
    </div>
  );
};

RatingStarsPlaceholder.propTypes = {
  ratingType: PropTypes.string.isRequired,
  showValue: PropTypes.bool,
};

export default RatingStarsPlaceholder;
