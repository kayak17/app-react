import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { setIsLoading } from '~/modules/process';

const useFetchList = (props) => {
  const HOOK_NAME = 'useFetchList';

  const propTypes = {
    setScrolledItems: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const { setScrolledItems } = props;
  const dispatch = useDispatch();

  const { fetchData } = useFetch({
    onRequest: () => {
      dispatch(setIsLoading(true));
    },
    onSuccess: (payload) => {
      setScrolledItems(payload);
      dispatch(setIsLoading(false));
    },
    onError: () => {
      dispatch(setIsLoading(false));
    },
  });

  return { fetchData };
};

export default useFetchList;
