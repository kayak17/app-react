import PropTypes from 'prop-types';
import ReviewsList from '~/components/review/list/list';
import { AppTitles, ReviewTitles } from '~/constants';
import { reviewsPropTypes } from '~/prop-types';

const PropertyReviews = ({
  reviews,
  reviewsCount,
  fetchReviews,
}) => {
  const canShowLoadMoreBtn = reviews.length < parseInt(reviewsCount, 10);

  const onLoadMoreBtnClick = () => {
    if (canShowLoadMoreBtn) {
      fetchReviews();
    }
  };

  if (reviews.length) {
    return (
      <>
        <h2 className="app-subtitle mb-4">
          {AppTitles.REVIEWS}
          &nbsp;&middot;&nbsp;
          <span>{reviewsCount}</span>
        </h2>
        <ReviewsList reviews={reviews} />
        {canShowLoadMoreBtn && (
          <div className="mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onLoadMoreBtnClick}
            >
              {AppTitles.LOAD_MORE}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <h2 className="fs-3 app-subtitle">{ReviewTitles.NO_REVIEWS}</h2>
  );
};

PropertyReviews.propTypes = {
  reviews: reviewsPropTypes,
  reviewsCount: PropTypes.string.isRequired,
  fetchReviews: PropTypes.func.isRequired,
};

export default PropertyReviews;
