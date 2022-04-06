import isEmpty from 'lodash/isEmpty';
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PageMainContent from '../content/content';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';
import usePrevious from '~/hooks/use-previous/use-previous';
import {
  getActiveCityId,
  getActiveCityName,
  getSortingType,
} from '~/modules/main';
import {
  AppActionTypes,
} from '~/constants';
import {
  appScrollTo,
  getOffersURL,
  throwUnknownActionError,
} from '~/utils';

export const ScrolledOffersContext = createContext(null);
export const ScrollContainerContext = createContext(null);
export const ScrolledOffersDispatchContext = createContext(null);

const PageMainWrapperOffers = ({ setIsLoading }) => {
  const COMPONENT_NAME = 'PageMainWrapperOffers';
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const sortingType = useSelector(getSortingType);
  const scrollContainer = useRef(null);

  const offersURL = getOffersURL(activeCityId, sortingType);
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
        return {
          ...state,
          activeCityName: action.payload.activeCityName,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        };
      case AppActionTypes.SET_SCROLLED_DATA:
        return {
          ...state,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
        };
      default:
        throwUnknownActionError(COMPONENT_NAME);
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
    cache: cacheoffers,
    isError: isOffersError,
    isLoaded: isOffersLoaded,
    fetchData: fetchOffers,
  } = useFetchCached({
    url: offersURL,
    onSuccess: (payload) => {
      setOffersData(payload);
      setIsLoading(false);
    },
    onFail: () => {
      setIsLoading(false);
    },
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
