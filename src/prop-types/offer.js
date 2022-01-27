import PropTypes from 'prop-types';
import { getItemOrNullPropTypes } from './app';

export const offerIdPropTypes = PropTypes.number.isRequired;

export const offerPropTypes = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  description: PropTypes.string.isRequired,
  id: offerIdPropTypes,
  image: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  wifi: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired,
}).isRequired;

export const offersPropTypes = PropTypes.arrayOf(offerPropTypes).isRequired;

export const offersReducerPropTypes = PropTypes.shape({
  activeCityName: PropTypes.string.isRequired,
  data: offersPropTypes,
  headerLink: getItemOrNullPropTypes(PropTypes.object.isRequired),
  totalCount: PropTypes.string.isRequired,
}).isRequired;
