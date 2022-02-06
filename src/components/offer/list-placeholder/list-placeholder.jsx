import PropTypes from 'prop-types';
import OfferCardPlaceholder from '../card-placeholder/card-placeholder';
import { emptyArrayPropTypes } from '~/prop-types';

const OffersListPlaceholder = ({
  offers,
  offerType,
}) => {
  return (
    <ul
      className="row row-cols-1 g-0 pt-1 px-3 justify-content-around list-unstyled"
      aria-hidden="true"
    >
      {offers.map((_, idx) => (
        <OfferCardPlaceholder
          key={idx}
          offerType={offerType}
        />
      ))}
    </ul>
  );
}

OffersListPlaceholder.propTypes = {
  offers: emptyArrayPropTypes,
  offerType: PropTypes.string.isRequired,
};

export default OffersListPlaceholder;
