import PropTypes from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { getOffersNearbyURL } from '~/utils';

const useFetchOffersNearby = (props) => {
  const HOOK_NAME = 'useFetchOffersNearby';

  const propTypes = {
    offerId: PropTypes.number.isRequired,
    setOffersNearby: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    offerId,
    setOffersNearby,
  } = props;

  const {
    isLoaded: isOffersNearbyLoaded,
  } = useFetch({
    url: getOffersNearbyURL(offerId),
    onSuccess: (payload) => {
      setOffersNearby(payload.data);
    },
  });

  return { isOffersNearbyLoaded };
};

export default useFetchOffersNearby;
