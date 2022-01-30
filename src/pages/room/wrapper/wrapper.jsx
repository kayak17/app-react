import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';
import useFetch from '~/hooks/use-fetch/use-fetch';
import useRouterNavigate from '~/hooks/use-router-navigate/use-router-navigate';
import {
  AppMessages,
  FetchingStatuses,
  OfferTypes,
} from '~/constants';
import {
  adaptOffer,
  getHeaderLinkNext,
  getOfferURL,
  getOffersNearbyURL,
  getReviewsURL,
  isOfferIdValid,
  throwErrorToBoundary,
} from '~/utils';

const PageRoomWrapper = ({ setIsLoading }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const offerIdParam = params.get('id');
  const offerId = parseInt(offerIdParam, 10);

  if (!isOfferIdValid(offerId)) {
    throwErrorToBoundary(AppMessages.INCORRECT_OFFERID);
  }

  const offerType = OfferTypes.ROOM;
  const redirectToRoute = useRouterNavigate();

  const [offer, setOffer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState('0');
  const [reviewsLinkNext, setReviewsLinkNext] = useState('');
  const [offersNearby, setOffersNearby] = useState([]);

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
    fetchData: fetchReviews,
  } = useFetch({
    url: getReviewsURL(offerId, offerType),
    onSuccess: (payload) => {
      setReviews(reviews.concat(payload.data));
      setReviewsCount(payload.totalCount);
      setReviewsLinkNext(getHeaderLinkNext(payload.headerLink));
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
  const isMoreReviewsStartLoading = stateReviews.status === FetchingStatuses.START;
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

  const handleFetchReviews = useCallback(() => {
    if (reviewsLinkNext.length) {
      fetchReviews(reviewsLinkNext);
    }
  }, [
    fetchReviews,
    reviewsLinkNext,
  ]);

  if (!isOfferLoaded) {
    // placeholder
    return null;
  } else if (isOfferError || isOfferLoaded && isEmpty(offer)) {
    throwErrorToBoundary(AppMessages.DATA_LOADING_ERROR);
  } else if (isOfferLoaded) {
    return (
      <PageRoomContent
        offer={offer}
        offerId={offerId}
        offerType={offerType}
        offersNearby={offersNearby}
        reviews={reviews}
        reviewsCount={reviewsCount}
        isReviewsLoaded={isReviewsLoaded}
        isOffersNearbyLoaded={isOffersNearbyLoaded}
        fetchReviews={handleFetchReviews}
        redirectToRoute={redirectToRoute}
      />
    );
  } else {
    return null;
  }
};

PageRoomWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageRoomWrapper;
