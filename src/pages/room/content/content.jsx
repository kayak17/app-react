import PropTypes from 'prop-types';
import OffersMap from '~/components/offer/map/map';
import PropertyContent from '~/components/property/content/content';
import PropertyNearby from '~/components/property/nearby/nearby';
import { offerPropTypes, offersPropTypes } from '~/prop-types';
import './content.less';

const PageRoomContent = ({
  offer,
  offerType,
  offersNearby,
  isCurrentOfferLoaded,
  isOffersNearbyLoaded,
  PropertyReviewsWrapper,
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

        <PropertyReviewsWrapper />

        {canShowOffersNearby && (
          <PropertyNearby
            offers={offersNearby}
            offerType={offerType}
          />
        )}
      </section>

      {isCurrentOfferLoaded && canShowOffersNearby && (
        <section className="mb-5 property-map-container">
          <OffersMap
            currentOffer={offer}
            offers={offersNearby}
          />
        </section>
      )}
    </>
  );
};

PageRoomContent.propTypes = {
  offer: offerPropTypes,
  offerType: PropTypes.string.isRequired,
  offersNearby: offersPropTypes,
  isCurrentOfferLoaded: PropTypes.bool.isRequired,
  isOffersNearbyLoaded: PropTypes.bool.isRequired,
  PropertyReviewsWrapper: PropTypes.elementType.isRequired,
};

export default PageRoomContent;
