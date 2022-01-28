import PropTypes from 'prop-types';
import { OfferTitles } from '~/constants';
import { capitalizeFirstLetter } from '~/utils';
import './features.less';

const PropertyFeatures = ({ features }) => {
  const { bedrooms, type } = features;

  return (
    <ul className="d-flex align-items-center justify-content-center
      list-unstyled property-features"
    >
      <li className="property-feature property-feature--entire">
        {capitalizeFirstLetter(type)}
      </li>
      <li className="property-feature property-feature--bedrooms">
        {`${bedrooms} ${OfferTitles.BEDROOMS}`}
      </li>
    </ul>
  );
};

PropertyFeatures.propTypes = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export default PropertyFeatures;
