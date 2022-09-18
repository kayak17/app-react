import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import PropertyReviews from '~/components/property/reviews/reviews';
import PropertyReviewsPlaceholder from '~/components/property/reviews-placeholder/reviews-placeholder';
import ReviewFormContainer from '~/components/review/form-container/form-container';
import { getItemOrNullPropTypes, reviewsPropTypes } from '~/prop-types';
import { appScrollIntoView, getHeaderLinkNext } from '~/utils';
import useReFetchReviews from './use-refetch-reviews';
import useFetchMoreReviews from './use-fetch-more-reviews';
import useReviewsReducer from './use-reviews-reducer';

const PropertyReviewsWrapper = ({
  offerId,
  reviewsUrl,
  reviewsData,
  isReviewsLoaded,
}) => {
  const scrollContainer = useRef(null);

  const { reviews, dispatch } = useReviewsReducer({ reviewsData });

  const { reFetchReviews } = useReFetchReviews({
    dispatch,
    appScrollIntoView,
    scrollContainer,
  });

  const { fetchMoreReviews } = useFetchMoreReviews({
    dispatch,
    reviewsData: reviews.data,
    appScrollIntoView,
    scrollContainer,
  });

  const handleReFetchReviews = useCallback(() => {
    reFetchReviews(reviewsUrl);
  }, [reFetchReviews, reviewsUrl]);

  const handleFetchMoreReviews = useCallback(() => {
    const reviewsLinkNext = getHeaderLinkNext(reviews.headerLink);

    if (reviewsLinkNext.length) {
      fetchMoreReviews(reviewsLinkNext);
    }
  }, [fetchMoreReviews, reviews.headerLink]);

  if (!isReviewsLoaded) {
    return (
      <PropertyReviewsPlaceholder />
    );
  }

  return (
    <div ref={scrollContainer}>
      <PropertyReviews
        reviews={reviews.data}
        reviewsTotalCount={reviews.totalCount}
        fetchReviews={handleFetchMoreReviews}
      />
      <ReviewFormContainer
        offerId={offerId}
        fetchReviews={handleReFetchReviews}
      />
    </div>
  );
};

PropertyReviewsWrapper.propTypes = {
  offerId: PropTypes.number.isRequired,
  reviewsUrl: PropTypes.string.isRequired,
  reviewsData: PropTypes.shape({
    data: getItemOrNullPropTypes(reviewsPropTypes),
    headerLink: getItemOrNullPropTypes(PropTypes.object.isRequired),
    totalCount: getItemOrNullPropTypes(PropTypes.string.isRequired),
  }).isRequired,
  isReviewsLoaded: PropTypes.bool.isRequired,
};

export default PropertyReviewsWrapper;
