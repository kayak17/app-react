import PropTypes, { number } from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { getFavoriteOffersURL } from '~/utils';
import { getOffersMapByCity } from '../helpers';

const useFetchFavorites = (props) => {
  const HOOK_NAME = 'useFetchFavorites';

  const propTypes = {
    setIsLoading: PropTypes.func.isRequired,
    favoriteOffersIds: PropTypes.arrayOf(number).isRequired,
    setOffersMapByCity: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    setIsLoading,
    favoriteOffersIds,
    setOffersMapByCity,
  } = props;

  const { isError, isLoaded } = useFetch({
    url: getFavoriteOffersURL(favoriteOffersIds),
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      setOffersMapByCity(getOffersMapByCity(payload.data));
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return { isError, isLoaded };
};

export default useFetchFavorites;
