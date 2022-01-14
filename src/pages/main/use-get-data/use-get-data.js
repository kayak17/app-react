import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import { getActiveCityId, setActiveCity } from '~/modules/main';
import { setIsLoading } from '~/modules/process';
import { APIRoutes } from '~/constants';
import { getOffersURLByCity } from '~/utils';

const useGetData = () => {
  const activeCityId = useSelector(getActiveCityId);
  const dispatch = useDispatch();
  const location = useLocation();

  const [offers, setOffers] = useState([]);

  const {
    cache: cacheoffers,
    state: stateOffers,
    fetchData: fetchOffers,
  } = useFetchCached({
    onSuccess: (payload) => {
      setOffers(payload.data);
      dispatch(setIsLoading(false));
    },
    onFail: () => {
      dispatch(setIsLoading(false));
    },
  });

  const {
    state: stateCities,
  } = useFetchCached({
    url: APIRoutes.CITIES,
    onSuccess: (payload) => {
      const params = new URLSearchParams(location.search);
      const cityId = params.get('city.id');
      const cities = payload.data;

      const newActiveCity = cityId ?
        find(cities, ['id', cityId]) || cities[0] :
        find(cities, ['id', activeCityId]) || cities[0];
      const newActiveCityId = newActiveCity.id;

      dispatch(setActiveCity(newActiveCity));
      fetchOffers(getOffersURLByCity(newActiveCityId));
    },
    onFail: () => {
      dispatch(setIsLoading(false));
    },
  });

  const handleSetActiveCity = useCallback((city) => {
    const cityId = city.id;
    const offersURLByCity = getOffersURLByCity(cityId);
    const payload = cacheoffers.current[offersURLByCity];

    if (isEmpty(payload)) {
      dispatch(setIsLoading(true));
      fetchOffers(offersURLByCity);
    } else {
      setOffers(payload.data);
    }
  }, [
    dispatch,
    cacheoffers,
    fetchOffers,
  ]);

  return {
    offers,
    stateCities,
    stateOffers,
    handleSetActiveCity,
  };
};

export default useGetData;
