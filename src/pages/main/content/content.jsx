import { memo } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '~/components/cities/list/list';
import CitiesListPlaceholder from '~/components/cities/list-placeholder/list-placeholder';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import PlacesWrapperPlaceholder from '~/components/places/wrapper-placeholder/wrapper-placeholder';
import { citiesPropTypes, offersReducerPropTypes } from '~/prop-types';
import { throwErrorToBoundary } from '~/utils';

const PageMainContent = ({
  cities,
  offersReducer,
  isCitiesError,
  isCitiesLoaded,
  isOffersLoading,
  isOffersError,
  isOffersLoaded,
}) => {
  const getCitiesMarkup = () => {
    if (isCitiesLoaded) {
      return <CitiesList cities={cities} />;
    } else {
      return <CitiesListPlaceholder />;
    }
  };

  const getPlacesMarkup = () => {
    if (!isCitiesError && isOffersLoading) {
      return (
        <PlacesWrapperPlaceholder />
      );
    } else if (isCitiesError || isOffersError) {
      throwErrorToBoundary();
    } else if (isOffersLoaded) {
      return (
        <PlacesWrapper
          offersReducer={offersReducer}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {getCitiesMarkup()}
      {getPlacesMarkup()}
    </>
  );
};

PageMainContent.propTypes = {
  cities: citiesPropTypes,
  offersReducer: offersReducerPropTypes,
  isCitiesError: PropTypes.bool.isRequired,
  isCitiesLoaded: PropTypes.bool.isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
