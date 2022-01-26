import { memo } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '../list/list';
import CitiesListPlaceholder from '../list-placeholder/list-placeholder';
import { citiesPropTypes } from '~/prop-types';

const CitiesWrapper = ({ cities, isCitiesLoaded }) => {
  if (isCitiesLoaded) {
    return <CitiesList cities={cities} />;
  } else {
    return <CitiesListPlaceholder />;
  }
};

CitiesWrapper.propTypes = {
  cities: citiesPropTypes,
  isCitiesLoaded: PropTypes.bool.isRequired,
};

export default memo(CitiesWrapper);
