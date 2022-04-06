import isEmpty from 'lodash/isEmpty';
import { useCallback, useReducer, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';
import PageRoomContentPlaceholder from '../content-placeholder/content-placeholder';
import PropertyReviews from '~/components/property/reviews/reviews';
import ReviewFormContainer from '~/components/review/form-container/form-container';
import useFetch from '~/hooks/use-fetch/use-fetch';
import {
  AppActionTypes,
  AppMessages,
  OfferTypes,
} from '~/constants';
import {
  appScrollIntoView,
  getHeaderLinkNext,
  getOfferURL,
  getOffersNearbyURL,
  getReviewsURL,
  isOfferIdValid,
  throwErrorToBoundary,
  throwUnknownActionError,
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

  const COMPONENT_NAME = 'PageRoomWrapper';
  const offerType = OfferTypes.ROOM;
  const reviewsUrl = getReviewsURL(offerId, offerType);

  const [offer, setOffer] = useState({});
  const [offersNearby, setOffersNearby] = useState([]);
  const scrollContainer = useRef(null);

  const initialState = {
    data: [],
    headerLink: {},
    totalCount: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.SET_DATA:
        return {
          ...state,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        };
      case AppActionTypes.SET_SCROLLED_DATA:
        return {
          ...state,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
        };
      default:
        throwUnknownActionError(COMPONENT_NAME);
    }
  };

  const [reviews, dispatchData] = useReducer(reducer, initialState);

  const setReviewsData = (payload) => {
    dispatchData({
      type: AppActionTypes.SET_DATA,
      payload: {
        data: payload.data,
        headerLink: payload.headerLink,
        totalCount: payload.totalCount,
      },
    });
  };

  const {
    isError: isOfferError,
    isLoaded: isOfferLoaded,
  } = useFetch({
    url: getOfferURL(offerId),
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      const offer = adaptOffer(payload.data.slice()[0]);
      setOffer(offer);
      setIsLoading(false);
    },
    onFail: () => {
      setIsLoading(false);
    },
  });

  const {
    isLoaded: isReviewsLoaded,
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
      appScrollIntoView(scrollContainer);
    },
  });

  const {
    fetchData: fetchMoreReviews,
  } = useFetch({
    onSuccess: (payload) => {
      dispatchData({
        type: AppActionTypes.SET_SCROLLED_DATA,
        payload: {
          data: reviews.data.concat(payload.data),
          headerLink: payload.headerLink,
        },
      });

      appScrollIntoView(scrollContainer);
    },
  });

  const { isLoaded: isOffersNearbyLoaded } = useFetch({
    url: getOffersNearbyURL(offerId),
    onSuccess: (payload) => {
      setOffersNearby(payload.data);
    },
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

  if (isOfferError || isOfferLoaded && isEmpty(offer)) {
    throwErrorToBoundary();
  } else if (!isOfferLoaded) {
    return (
      <PageRoomContentPlaceholder offerType={offerType} />
    );
  }

  const PropertyReviewsWrapped = () => (
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

  return (
    <PageRoomContent
      offer={offer}
      offerType={offerType}
      offersNearby={offersNearby}
      isReviewsLoaded={isReviewsLoaded}
      isCurrentOfferLoaded={isOfferLoaded}
      isOffersNearbyLoaded={isOffersNearbyLoaded}
      PropertyReviewsWrapper={PropertyReviewsWrapped}
    />
  );
};

PageRoomWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageRoomWrapper;
