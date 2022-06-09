import find from 'lodash/find';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { getActiveCityId, setActiveCity } from '~/modules/main';
import { APIRoutes } from '~/constants';

const useFetchCities = (props) => {
  const HOOK_NAME = 'useFetchCities';

  const propTypes = {
    setCities: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    setCities,
    setIsLoading,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const cityId = params.get('city.id');
  const activeCityId = useSelector(getActiveCityId);

  const {
    isError: isCitiesError,
    isLoaded: isCitiesLoaded,
  } = useFetch({
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
    onError: () => {
      setIsLoading(false);
    },
  });

  return { isCitiesError, isCitiesLoaded };
};

export default useFetchCities;
