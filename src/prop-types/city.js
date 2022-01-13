import PropTypes from 'prop-types';

export const cityPropTypes = PropTypes.oneOfType([
  PropTypes.shape({}).isRequired,
  PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
]);

export const citiesPropTypes = PropTypes.arrayOf(cityPropTypes).isRequired;
