import PropTypes from 'prop-types';
import OffersList from '~/components/offer/list/list';
import withOffersListHover from '~/hocs/with-offers-list-hover/with-offers-list-hover';
import { ReviewTitles } from '~/constants';
import { offersPropTypes } from '~/prop-types';
import './nearby.less';

const OffersListWrapped = withOffersListHover(OffersList);

const PropertyNearby = ({ offers, offerType }) => {
  return (
    <section>
      <h2 className="mt-4 mb-4 text-center app-subtitle">
        {ReviewTitles.PLACES_NEARBY}
      </h2>
      <div className="pt-2 ms-auto me-auto property-offers-nearby">
        <OffersListWrapped
          offers={offers}
          offerType={offerType}
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
