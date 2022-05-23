import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';
import PageRoomContentPlaceholder from '../content-placeholder/content-placeholder';
import PropertyReviewsWrapper from '~/components/property/reviews-wrapper/reviews-wrapper';
import { AppMessages, OfferTypes } from '~/constants';
import { getReviewsURL, isOfferIdValid, throwErrorToBoundary } from '~/utils';
import useFetchOffer from './use-fetch-offer';
import useFetchReviews from './use-fetch-reviews';
import useFetchOffersNearby from './use-fetch-offers-nearby';

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
    isOfferError,
    isOfferLoaded,
  } = useFetchOffer({
    offerId,
    setOffer,
    setIsLoading,
  });

  const {
    isReviewsLoaded,
  } = useFetchReviews({
    reviewsUrl,
    setReviewsData,
  });

  const {
    isOffersNearbyLoaded,
  } = useFetchOffersNearby({
    offerId,
    setOffersNearby,
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
