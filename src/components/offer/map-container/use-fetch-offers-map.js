import PropTypes from 'prop-types';
import useFetchCached from '~/hooks/use-fetch-cached/use-fetch-cached';

const useFetchOffersMap = (props) => {
  const HOOK_NAME = 'useFetchOffersMap';

  const propTypes = {
    offersMapURL: PropTypes.string.isRequired,
    setOffersMap: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const { offersMapURL, setOffersMap } = props;

  const {
    cache: cacheoffersMap,
    isLoaded: isOffersMapLoaded,
    fetchData: fetchMapOffers,
  } = useFetchCached({
    url: offersMapURL,
    onSuccess: (payload) => {
      setOffersMap(payload.data);
    },
  });

  return {
    cacheoffersMap,
    isOffersMapLoaded,
    fetchMapOffers,
  };
};

export default useFetchOffersMap;
