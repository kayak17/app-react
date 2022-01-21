import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { lazy, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import withSpinner from '~/hocs/with-spinner/with-spinner';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import usePrevious from '~/hooks/use-previous/use-previous';
import MainLayout from '~/layouts/main/main';
import { getActiveCityId, getActiveCityName, setActiveCity } from '~/modules/main';
import { APIRoutes, FetchingStatuses } from '~/constants';
import { getOffersURLByCityId } from '~/utils';

const PageMain = lazy(() => import('../content/content'));

const PageMainWrapper = ({
  setIsLoading,
}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityId = params.get('city.id');

  const dispatch = useDispatch();
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);

  const offersURL = useMemo(() => (
    getOffersURLByCityId(activeCityId)
  ), [activeCityId]);
  const prevOffersURL = usePrevious(offersURL);

  const [cities, setCities] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offersTotalCount, setOffersTotalCount] = useState('0');

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
      setOffers(payload.data);
      setOffersTotalCount(payload.totalCount);
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
    if (isCitiesLoaded && isOffersLoaded && prevOffersURL !== offersURL) {
      const payload = cacheoffers.current[offersURL];

      if (isEmpty(payload)) {
        setIsLoading(true);
        fetchOffers(offersURL);
      } else {
        setOffers(payload.data);
      }
    }
  }, [
    dispatch,
    cacheoffers,
    offersURL,
    prevOffersURL,
    fetchOffers,
    setIsLoading,
    isCitiesLoaded,
    isOffersLoaded,
  ]);

  return (
    <MainLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageMain
          cities={cities}
          offers={offers}
          isCitiesError={isCitiesError}
          isCitiesLoaded={isCitiesLoaded}
          isOffersLoading={isOffersLoading}
          isOffersError={isOffersError}
          activeCityName={activeCityName}
          offersTotalCount={offersTotalCount}
        />
      </ErrorBoundary>
    </MainLayout>
  );
};

PageMainWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default withSpinner(PageMainWrapper);
