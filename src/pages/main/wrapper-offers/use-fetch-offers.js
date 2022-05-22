import PropTypes from 'prop-types';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';

const useFetchOffers = (props) => {
  const HOOK_NAME = 'useFetchOffers';

  const propTypes = {
    offersURL: PropTypes.string.isRequired,
    setOffersData: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    offersURL,
    setOffersData,
    setIsLoading,
  } = props;

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
    onError: () => {
      setIsLoading(false);
    },
  });

  return {
    cacheoffers,
    isOffersError,
    isOffersLoaded,
    fetchOffers,
  };
};

export default useFetchOffers;
