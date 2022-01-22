import OfferCardPlaceholder from '../card-placeholder/card-placeholder';
import { emptyArrayPropTypes } from '~/prop-types';

const OffersListPlaceholder = ({
  offers,
}) => {
  return (
    <ul
      className="row row-cols-1 g-0 list-unstyled"
      aria-hidden="true"
    >
      {offers.map((_, idx) => (
        <OfferCardPlaceholder key={idx} />
      ))}
    </ul>
  );
}

OffersListPlaceholder.propTypes = {
  offers: emptyArrayPropTypes,
};

export default OffersListPlaceholder;
