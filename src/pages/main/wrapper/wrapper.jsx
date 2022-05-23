import { useState } from 'react';
import PropTypes from 'prop-types';
import CitiesWrapper from '~/components/cities/wrapper/wrapper';
import PageMainWrapperOffers from '../wrapper-offers/wrapper-offers';
import useFetchCities from './use-fetch-cities';

const PageMainWrapper = ({ setIsLoading }) => {
  const [cities, setCities] = useState([]);

  const {
    isCitiesError,
    isCitiesLoaded,
  } = useFetchCities({
    setCities,
    setIsLoading,
  });

  return (
    <>
      <CitiesWrapper
        cities={cities}
        isCitiesError={isCitiesError}
        isCitiesLoaded={isCitiesLoaded}
      />
      {isCitiesLoaded && (
        <PageMainWrapperOffers
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

PageMainWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageMainWrapper;
