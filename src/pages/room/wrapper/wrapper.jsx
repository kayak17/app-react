import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';
import PageRoomContentPlaceholder from '../content-placeholder/content-placeholder';
import PropertyReviewsWrapper from '~/components/property/reviews-wrapper/reviews-wrapper';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { AppMessages, OfferTypes } from '~/constants';
import {
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
  const [offersNearby, setOffersNearby] = useState([]);
  const [reviewsData, setReviewsData] = useState({});

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
    isLoaded: isOffersNearbyLoaded,
  } = useFetch({
    url: getOffersNearbyURL(offerId),
    onSuccess: (payload) => {
      setOffersNearby(payload.data);
    },
  });

  if (isOfferError || isOfferLoaded && isEmpty(offer)) {
    throwErrorToBoundary();
  } else if (!isOfferLoaded) {
    return (
      <PageRoomContentPlaceholder offerType={offerType} />
    );
  }

  const PropertyReviewsWrapped = () => (
    <PropertyReviewsWrapper
      offerId={offerId}
      reviewsUrl={reviewsUrl}
      reviewsData={reviewsData}
      isReviewsLoaded={isReviewsLoaded}
    />
  );

  return (
    <PageRoomContent
      offer={offer}
      offerType={offerType}
      offersNearby={offersNearby}
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
