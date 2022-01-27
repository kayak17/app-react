import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CitiesWrapper from '~/components/cities/wrapper/wrapper';
import PageMain from '../content/content';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import usePrevious from '~/hooks/use-previous/use-previous';
import {
  getActiveCityId,
  getActiveCityName,
  getSortingType,
  setActiveCity,
} from '~/modules/main';
import {
  APIRoutes,
  AppActionTypes,
  FetchingStatuses,
} from '~/constants';
import {
  getOffersURL,
  getOffersMapURL,
  getUnknownActionTypeMsg,
} from '~/utils';

const PageMainWrapper = ({ setIsLoading }) => {
  const COMPONENT_NAME = 'PageMainWrapper';
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const cityId = params.get('city.id');

  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const sortingType = useSelector(getSortingType);
  const [cities, setCities] = useState([]);
  const [offersMap, setOffersMap] = useState([]);

  const offersURL = getOffersURL(activeCityId, sortingType);
  const prevOffersURL = usePrevious(offersURL);
  const offersMapURL = getOffersMapURL(activeCityId);
  const prevOffersMapURL = usePrevious(offersMapURL);

  const initialState = {
    activeCityName: '',
    data: [],
    headerLink: {},
    totalCount: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.SET_DATA:
        return Object.assign({}, state, {
          activeCityName: action.payload.activeCityName,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        });
      default:
        throw new Error(getUnknownActionTypeMsg(COMPONENT_NAME));
    }
  };

  const dispatchSetData = useCallback((payload) => {
    dispatchData({
      type: AppActionTypes.SET_DATA,
      payload: {
        activeCityName,
        data: payload.data,
        headerLink: payload.headerLink,
        totalCount: payload.totalCount,
      },
    });
  }, [activeCityName]);

  const [offersReducer, dispatchData] = useReducer(reducer, initialState);

  const {
    state: stateCities,
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
      const newActiveCityId = newActiveCity.id;

      dispatch(setActiveCity(newActiveCity));
      fetchOffers(getOffersURL(newActiveCityId, sortingType));
      fetchMapOffers(getOffersMapURL(newActiveCityId));
    },
    onFail: () => {
      setIsLoading(false);
    },
  });

  const {
    cache: cacheoffers,
    state: stateOffers,
    fetchData: fetchOffers,
  } = useFetchCached({
    onSuccess: (payload) => {
      dispatchSetData(payload);
      setIsLoading(false);
    },
    onFail: () => {
      setIsLoading(false);
    },
  });

  const {
    cache: cacheoffersMap,
    state: stateOffersMap,
    fetchData: fetchMapOffers,
  } = useFetchCached({
    onSuccess: (payload) => {
      setOffersMap(payload.data);
    },
  });

  const isCitiesError = (
    stateCities.status === FetchingStatuses.ERROR
  );
  const isCitiesLoaded = (
    stateCities.status === FetchingStatuses.LOADED
  );

  const isOffersError = (
    stateOffers.status === FetchingStatuses.ERROR
  );
  const isOffersLoaded = (
    stateOffers.status === FetchingStatuses.LOADED
  );
  const isOffersLoading = (
    !isOffersError && !isOffersLoaded
  );

  const isOffersMapLoaded = (
    stateOffersMap.status === FetchingStatuses.LOADED
  );

  useEffect(() => {
    if (
      isCitiesLoaded && isOffersLoaded &&
      prevOffersURL !== offersURL
    ) {
      const payload = cacheoffers.current[offersURL];

      if (isEmpty(payload)) {
        setIsLoading(true);
        fetchOffers(offersURL);
      } else {
        dispatchSetData(payload);
      }
    }
  }, [
    cacheoffers,
    dispatchSetData,
    fetchOffers,
    isCitiesLoaded,
    isOffersLoaded,
    offersURL,
    prevOffersURL,
    setIsLoading,
  ]);

  useEffect(() => {
    if (
      isCitiesLoaded && isOffersMapLoaded &&
      prevOffersMapURL !== offersMapURL
    ) {
      const payload = cacheoffersMap.current[offersMapURL];

      if (isEmpty(payload)) {
        fetchMapOffers(offersMapURL);
      } else {
        setOffersMap(payload.data);
      }
    }
  }, [
    cacheoffersMap,
    fetchMapOffers,
    isCitiesLoaded,
    isOffersMapLoaded,
    offersMapURL,
    prevOffersMapURL,
  ]);

  return (
    <>
      <CitiesWrapper
        cities={cities}
        isCitiesLoaded={isCitiesLoaded}
      />
      <PageMain
        offersMap={offersMap}
        offersReducer={offersReducer}
        isCitiesError={isCitiesError}
        isOffersLoading={isOffersLoading}
        isOffersError={isOffersError}
        isOffersLoaded={isOffersLoaded}
      />
    </>
  );
};

PageMainWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageMainWrapper;
