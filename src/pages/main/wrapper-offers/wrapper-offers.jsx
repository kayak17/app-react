import isEmpty from 'lodash/isEmpty';
import { createContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PageMainContent from '../content/content';
import usePrevious from '~/hooks/use-previous/use-previous';
import { getActiveCityId, getSortingType } from '~/modules/main';
import { appScrollTo, getOffersURL } from '~/utils';
import useFetchOffers from './use-fetch-offers';
import useOffersReducer from './use-offers-reducer';

export const ScrolledOffersContext = createContext(null);
export const ScrollContainerContext = createContext(null);
export const ScrolledOffersDispatchContext = createContext(null);

const PageMainWrapperOffers = ({ setIsLoading }) => {
  const activeCityId = useSelector(getActiveCityId);
  const sortingType = useSelector(getSortingType);
  const scrollContainer = useRef(null);

  const offersURL = getOffersURL(activeCityId, sortingType);
  const prevOffersURL = usePrevious(offersURL);

  const {
    dispatch: dispatchData,
    offersReducer,
    setOffersData,
  } = useOffersReducer();

  const {
    cacheoffers,
    isOffersError,
    isOffersLoaded,
    fetchOffers,
  } = useFetchOffers({
    offersURL,
    setOffersData,
    setIsLoading,
  });

  useEffect(() => {
    if (
      isOffersLoaded &&
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
    isOffersLoaded,
    offersURL,
    prevOffersURL,
    setIsLoading,
  ]);

  return (
    <ScrolledOffersContext.Provider value={offersReducer}>
      <ScrollContainerContext.Provider value={scrollContainer}>
        <ScrolledOffersDispatchContext.Provider value={dispatchData}>
          <PageMainContent
            isOffersError={isOffersError}
            isOffersLoaded={isOffersLoaded}
          />
        </ScrolledOffersDispatchContext.Provider>
      </ScrollContainerContext.Provider>
    </ScrolledOffersContext.Provider>
  );
};

PageMainWrapperOffers.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageMainWrapperOffers;
