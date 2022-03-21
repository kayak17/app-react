import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../card/card';
import { offersPropTypes } from '~/prop-types';

const OffersList = forwardRef(
  function OffersList({
    offers,
    offerType,
    handleOfferCardMouseEnter = () => false,
    handleOfferCardMouseLeave = () => false,
  }, ref) {
    return (
      <ul
        ref={ref}
        className="row row-cols-1 g-0 justify-content-around list-unstyled"
      >
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            offerType={offerType}
            handleOfferCardMouseEnter={() => handleOfferCardMouseEnter(offer)}
            handleOfferCardMouseLeave={handleOfferCardMouseLeave}
          />
        ))}
      </ul>
    );
  }
);

OffersList.propTypes = {
  offers: offersPropTypes,
  offerType: PropTypes.string.isRequired,
  handleOfferCardMouseEnter: PropTypes.func,
  handleOfferCardMouseLeave: PropTypes.func,
};

export default OffersList;
