import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { createContext, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CitiesWrapper from '~/components/cities/wrapper/wrapper';
import PageMainContent from '../content/content';
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
  appScrollTo,
  getOffersURL,
  getOffersMapURL,
  getUnknownActionTypeMsg,
} from '~/utils';

export const ScrolledOffersContext = createContext(null);
export const ScrollContainerContext = createContext(null);
export const ScrolledOffersDispatchContext = createContext(null);

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
  const scrollContainer = useRef(null);

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
      case AppActionTypes.SET_SCROLLED_DATA:
        return Object.assign({}, state, {
          data: action.payload.data,
          headerLink: action.payload.headerLink,
        });
      default:
        throw new Error(getUnknownActionTypeMsg(COMPONENT_NAME));
    }
  };

  const [offersReducer, dispatchData] = useReducer(reducer, initialState);

  const setOffersData = useCallback((payload) => {
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
      setOffersData(payload);
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

  const isOffersMapLoaded = (
    stateOffersMap.status === FetchingStatuses.LOADED
  );

  useEffect(() => {
    if (
      isCitiesLoaded && isOffersLoaded &&
      prevOffersURL !== offersURL
    ) {
      appScrollTo(scrollContainer);
      const payload = cacheoffers.current[offersURL];

      if (isEmpty(payload)) {
        setIsLoading(true);
        fetchOffers(offersURL);
      } else {
        setOffersData(payload);
      }
    }
  }, [
    cacheoffers,
    fetchOffers,
    setOffersData,
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
        isCitiesError={isCitiesError}
        isCitiesLoaded={isCitiesLoaded}
      />
      <ScrolledOffersContext.Provider value={offersReducer}>
        <ScrollContainerContext.Provider value={scrollContainer}>
          <ScrolledOffersDispatchContext.Provider value={dispatchData}>
            <PageMainContent
              offersMap={offersMap}
              isOffersError={isOffersError}
              isOffersLoaded={isOffersLoaded}
            />
          </ScrolledOffersDispatchContext.Provider>
        </ScrollContainerContext.Provider>
      </ScrolledOffersContext.Provider>
    </>
  );
};

PageMainWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageMainWrapper;
