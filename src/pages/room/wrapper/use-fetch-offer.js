import PropTypes from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { getOfferURL } from '~/utils';
import { adaptOffer } from '~/adapters/offer';

const useFetchOffer = (props) => {
  const HOOK_NAME = 'useFetchOffer';

  const propTypes = {
    offerId: PropTypes.number.isRequired,
    setOffer: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    offerId,
    setOffer,
    setIsLoading,
  } = props;

  const {
    isError: isOfferError,
    isLoaded: isOfferLoaded,
  } = useFetch({
    url: getOfferURL(offerId),
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      const offer = adaptOffer(payload.data.slice()[0]);
      setOffer(offer);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return { isOfferError, isOfferLoaded };
};

export default useFetchOffer;
