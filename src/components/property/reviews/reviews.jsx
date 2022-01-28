import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import FormReview from '~/components/forms/review/review';
import ReviewsList from '~/components/review/list/list';
import ReviewsNoAuth from '~/components/review/no-auth/no-auth';
import { getIsAuth } from '~/modules/user';
import { AppTitles, ReviewTitles } from '~/constants';
import { reviewsPropTypes } from '~/prop-types';
import './reviews.less';

const PropertyReviews = ({
  offerId,
  reviews,
  reviewsCount,
  fetchReviews,
  canShowLoadMoreBtn,
}) => {
  const isAuth = useSelector(getIsAuth);

  const onLoadMoreBtnClick = () => {
    fetchReviews();
  };

  return (
    <section>
      {reviews.length ? (
        <>
          <h2 className="app-subtitle mb-4">
            {AppTitles.REVIEWS}
            &nbsp;&middot;&nbsp;
            <span>{reviewsCount}</span>
          </h2>
          <ReviewsList reviews={reviews} />
          {canShowLoadMoreBtn && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={onLoadMoreBtnClick}
            >
              {AppTitles.LOAD_MORE}
            </button>
          )}
        </>
      ) : (
        <h2>{ReviewTitles.NO_REVIEWS}</h2>
      )}

      {isAuth ? (
        <>
          <p className="text-start fw-bold fst-italic">
            {ReviewTitles.YOUR_REVIEW}
          </p>
          {/* <FormReview offerId={offerId} /> */}
        </>
      ) : (
        <ReviewsNoAuth />
      )}
    </section>
  );
};

PropertyReviews.propTypes = {
  offerId: PropTypes.string.isRequired,
  reviews: reviewsPropTypes,
  reviewsCount: PropTypes.string.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  canShowLoadMoreBtn: PropTypes.bool.isRequired,
};

export default PropertyReviews;
