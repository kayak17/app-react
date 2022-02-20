import PropTypes from 'prop-types';
import OffersList from '~/components/offer/list/list';
import useOffersListHover from '~/hooks/use-offers-list-hover/use-offers-list-hover';
import { ReviewTitles } from '~/constants';
import { offersPropTypes } from '~/prop-types';
import './nearby.less';

const PropertyNearby = ({ offers, offerType }) => {
  const {
    handleOfferCardMouseEnter,
    handleOfferCardMouseLeave,
  } = useOffersListHover();

  return (
    <section>
      <h2 className="mt-4 mb-4 text-center app-subtitle">
        {ReviewTitles.PLACES_NEARBY}
      </h2>
      <div className="pt-2 ms-auto me-auto property-offers-nearby">
        <OffersList
          offers={offers}
          offerType={offerType}
          handleOfferCardMouseEnter={handleOfferCardMouseEnter}
          handleOfferCardMouseLeave={handleOfferCardMouseLeave}
        />
      </div>
    </section>
  );
};

PropertyNearby.propTypes = {
  offers: offersPropTypes,
  offerType: PropTypes.string.isRequired,
};

export default PropertyNearby;
