import PropTypes from 'prop-types';
import { offerIdPropTypes } from './offer';

export const mapPinIdPropTypes = offerIdPropTypes;

export const offerMapPropTypes = PropTypes.shape({
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: offerIdPropTypes,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export const offersMapPropTypes = PropTypes.arrayOf(offerMapPropTypes).isRequired;
