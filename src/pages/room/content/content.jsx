import PropTypes from 'prop-types';
import OffersMap from '~/components/offer/map/map';
import PropertyContent from '~/components/property/content/content';
import PropertyNearby from '~/components/property/nearby/nearby';
import PropertyReviews from '~/components/property/reviews/reviews';
import {
  offerPropTypes,
  offersPropTypes,
  reviewsPropTypes,
} from '~/prop-types';
import './content.less';

const PageRoomContent = ({
  offer,
  offerId,
  offerType,
  offersNearby,
  reviews,
  reviewsCount,
  isReviewsLoaded,
  isOffersNearbyLoaded,
  fetchReviews,
  redirectToRoute,
}) => {
  const canShowOffersNearby = isOffersNearbyLoaded &&
    Boolean(offersNearby.length);

  return (
    <>
      <section className="mt-4 ms-auto me-auto mb-3 text-center
        property-container"
      >
        <PropertyContent
          offer={offer}
          offerType={offerType}
        />
        {isReviewsLoaded && (
          <PropertyReviews
            offerId={offerId}
            reviews={reviews}
            reviewsCount={reviewsCount}
            fetchReviews={fetchReviews}
          />
        )}
        {canShowOffersNearby && (
          <PropertyNearby
            offers={offersNearby}
            offerType={offerType}
          />
        )}
      </section>
      {isOffersNearbyLoaded && (
        <section className="mb-5 property-map-container">
          <OffersMap
            offers={offersNearby}
            redirectToRoute={redirectToRoute}
          />
        </section>
      )}
    </>
  );
};

PageRoomContent.propTypes = {
  offer: offerPropTypes,
  offerId: PropTypes.number.isRequired,
  offerType: PropTypes.string.isRequired,
  offersNearby: offersPropTypes,
  reviews: reviewsPropTypes,
  reviewsCount: PropTypes.string.isRequired,
  isReviewsLoaded: PropTypes.bool.isRequired,
  isOffersNearbyLoaded: PropTypes.bool.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  redirectToRoute: PropTypes.func.isRequired,
};

export default PageRoomContent;
