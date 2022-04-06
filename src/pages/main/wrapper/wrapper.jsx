import find from 'lodash/find';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CitiesWrapper from '~/components/cities/wrapper/wrapper';
import PageMainWrapperOffers from '../wrapper-offers/wrapper-offers';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import { getActiveCityId, setActiveCity } from '~/modules/main';
import { APIRoutes } from '~/constants';

const PageMainWrapper = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const cityId = params.get('city.id');

  const activeCityId = useSelector(getActiveCityId);
  const [cities, setCities] = useState([]);

  const {
    isError: isCitiesError,
    isLoaded: isCitiesLoaded,
  } = useFetchCached({
    url: APIRoutes.CITIES,
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      const cities = payload.data;
      setCities(cities);

      const newActiveCity = cityId ?
        find(cities, ['id', cityId]) || cities[0] :
        find(cities, ['id', activeCityId]) || cities[0];

      dispatch(setActiveCity(newActiveCity));
    },
    onFail: () => {
      setIsLoading(false);
    },
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
