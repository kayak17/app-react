import PropTypes from 'prop-types';

export const emptyArrayPropTypes = PropTypes.arrayOf(
  PropTypes.oneOf([undefined])
).isRequired;

export const getItemOrNullPropTypes = (itemPropTypes) => (
  PropTypes.oneOfType([
    itemPropTypes,
    PropTypes.oneOf([null]).isRequired,
  ])
);
