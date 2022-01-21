import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { lazy, useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import withSpinner from '~/hocs/with-spinner/with-spinner';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import usePrevious from '~/hooks/use-previous/use-previous';
import MainLayout from '~/layouts/main/main';
import { getActiveCityId, getActiveCityName, setActiveCity } from '~/modules/main';
import { APIRoutes, AppActionTypes, FetchingStatuses } from '~/constants';
import { getOffersURLByCityId, getUnknownActionTypeMsg } from '~/utils';

const PageMain = lazy(() => import('../content/content'));

const PageMainWrapper = ({ setIsLoading }) => {
  const COMPONENT_NAME = 'PageMainWrapper';
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const cityId = params.get('city.id');
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const [cities, setCities] = useState([]);

  const offersURL = getOffersURLByCityId(activeCityId);
  const prevOffersURL = usePrevious(offersURL);

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
      fetchOffers(getOffersURLByCityId(newActiveCityId));
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

  return (
    <MainLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageMain
          cities={cities}
          offersReducer={offersReducer}
          isCitiesError={isCitiesError}
          isCitiesLoaded={isCitiesLoaded}
          isOffersLoading={isOffersLoading}
          isOffersError={isOffersError}
          isOffersLoaded={isOffersLoaded}
        />
      </ErrorBoundary>
    </MainLayout>
  );
};

PageMainWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default withSpinner(PageMainWrapper);
