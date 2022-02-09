import { memo } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '../list/list';
import CitiesListPlaceholder from '../list-placeholder/list-placeholder';
import { citiesPropTypes } from '~/prop-types';
import { throwErrorToBoundary } from '~/utils';

const CitiesWrapper = ({
  cities,
  isCitiesError,
  isCitiesLoaded,
}) => {
  if (isCitiesError) {
    throwErrorToBoundary();
  } else if (!isCitiesLoaded) {
    return (
      <CitiesListPlaceholder />
    );
  }

  return (
    <CitiesList cities={cities} />
  );
};

CitiesWrapper.propTypes = {
  cities: citiesPropTypes,
  isCitiesError: PropTypes.bool.isRequired,
  isCitiesLoaded: PropTypes.bool.isRequired,
};

export default memo(CitiesWrapper);
