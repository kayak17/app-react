import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';
import PropTypes from 'prop-types';

export const reviewPropTypes = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date(props, propName, componentName) {
    if (!isValid(parseISO(props[propName]))) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
      );
    }

    return null;
  },
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  offerId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
}).isRequired;

export const reviewsPropTypes = PropTypes.arrayOf(reviewPropTypes).isRequired;
