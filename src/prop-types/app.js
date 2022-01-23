import PropTypes from 'prop-types';

export const emptyArrayPropTypes = PropTypes.arrayOf(PropTypes.oneOf([undefined])).isRequired;
