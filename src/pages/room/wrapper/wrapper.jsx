import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';
import PageRoomContentPlaceholder from '../content-placeholder/content-placeholder';
import PropertyReviews from '~/components/property/reviews/reviews';
import ReviewFormContainer from '~/components/review/form-container/form-container';
import useFetch from '~/hooks/use-fetch/use-fetch';
import {
  AppMessages,
  FetchingStatuses,
  OfferTypes,
} from '~/constants';
import {
  appScrollTo,
  getHeaderLinkNext,
  getOfferURL,
  getOffersNearbyURL,
  getReviewsURL,
  isOfferIdValid,
  throwErrorToBoundary,
} from '~/utils';
import {
  adaptOffer,
} from '~/utils/adapters/offer';

const PageRoomWrapper = ({ setIsLoading }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const offerIdParam = params.get('id');
  const offerId = parseInt(offerIdParam, 10);

  if (!isOfferIdValid(offerId)) {
    throwErrorToBoundary(AppMessages.INCORRECT_OFFERID);
  }

  const offerType = OfferTypes.ROOM;
  const reviewsUrl = getReviewsURL(offerId, offerType);

  const [offer, setOffer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewsTotalCount, setReviewsTotalCount] = useState('0');
  const [reviewsLinkNext, setReviewsLinkNext] = useState('');
  const [offersNearby, setOffersNearby] = useState([]);
  const scrollContainer = useRef(null);

  const setReviewsData = (payload) => {
    setReviews(payload.data);
    setReviewsTotalCount(payload.totalCount);
    setReviewsLinkNext(getHeaderLinkNext(payload.headerLink));
  };

  const setReviewsScrolledData = (payload) => {
    setReviews(reviews.concat(payload.data));
    setReviewsTotalCount(payload.totalCount);
    setReviewsLinkNext(getHeaderLinkNext(payload.headerLink));
  };

  const { state: stateOffer } = useFetch({
    url: getOfferURL(offerId),
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      const offer = adaptOffer(payload.data.slice()[0]);
      setOffer(offer);
    },
  });

  const {
    state: stateReviews,
  } = useFetch({
    url: reviewsUrl,
    onSuccess: (payload) => {
      setReviewsData(payload);
    },
  });

  const {
    fetchData: reFetchReviews,
  } = useFetch({
    onSuccess: (payload) => {
      setReviewsData(payload);
      appScrollTo(scrollContainer);
    },
  });

  const {
    state: stateMoreReviews,
    fetchData: fetchMoreReviews,
  } = useFetch({
    onSuccess: (payload) => {
      setReviewsScrolledData(payload);
      appScrollTo(scrollContainer);
    },
  });

  const { state: stateOffersNearby } = useFetch({
    url: getOffersNearbyURL(offerId),
    onSuccess: (payload) => {
      setOffersNearby(payload.data);
    },
  });

  const isOfferError = stateOffer.status === FetchingStatuses.ERROR;
  const isOfferLoaded = stateOffer.status === FetchingStatuses.LOADED;
  const isReviewsLoaded = stateReviews.status === FetchingStatuses.LOADED;
  const isMoreReviewsStartLoading = stateMoreReviews.status === FetchingStatuses.START;
  const isOffersNearbyLoaded = stateOffersNearby.status === FetchingStatuses.LOADED;

  const isError = (
    isOfferError ||
    stateReviews.status === FetchingStatuses.ERROR ||
    stateOffersNearby.status === FetchingStatuses.ERROR
  );

  const isLoaded = isOfferLoaded && isReviewsLoaded;

  useEffect(() => {
    if (isError || isLoaded) {
      setIsLoading(false);
    }
  }, [
    isError,
    isLoaded,
    setIsLoading,
  ]);

  useEffect(() => {
    if (isOfferLoaded && isMoreReviewsStartLoading) {
      setIsLoading(true);
    }
  }, [
    isOfferLoaded,
    isMoreReviewsStartLoading,
    setIsLoading,
  ]);

  const handleReFetchReviews = useCallback(() => {
    reFetchReviews(reviewsUrl);
  }, [reFetchReviews, reviewsUrl]);

  const handleFetchMoreReviews = useCallback(() => {
    if (reviewsLinkNext.length) {
      fetchMoreReviews(reviewsLinkNext);
    }
  }, [fetchMoreReviews, reviewsLinkNext]);

  if (isOfferError || isOfferLoaded && isEmpty(offer)) {
    throwErrorToBoundary(AppMessages.DATA_LOADING_ERROR);
  } else if (!isOfferLoaded) {
    return (
      <PageRoomContentPlaceholder offerType={offerType} />
    );
  }

  const propertyReviewsWrapper = () => (
    <div ref={scrollContainer}>
      <PropertyReviews
        reviews={reviews}
        reviewsTotalCount={reviewsTotalCount}
        fetchReviews={handleFetchMoreReviews}
      />
      <ReviewFormContainer
        offerId={offerId}
        fetchReviews={handleReFetchReviews}
      />
    </div>
  );

  return (
    <PageRoomContent
      offer={offer}
      offerType={offerType}
      offersNearby={offersNearby}
      isReviewsLoaded={isReviewsLoaded}
      isCurrentOfferLoaded={isOfferLoaded}
      isOffersNearbyLoaded={isOffersNearbyLoaded}
      PropertyReviewsWrapper={propertyReviewsWrapper}
    />
  );
};

PageRoomWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageRoomWrapper;
