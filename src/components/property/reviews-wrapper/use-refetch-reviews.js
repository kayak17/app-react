import PropTypes from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { AppActionTypes } from '~/constants';
import { refPropTypes } from '~/prop-types';

const useReFetchReviews = (props) => {
  const HOOK_NAME = 'useReFetchReviews';

  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    appScrollIntoView: PropTypes.func.isRequired,
    scrollContainer: refPropTypes,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    dispatch,
    appScrollIntoView,
    scrollContainer,
  } = props;

  const { fetchData: reFetchReviews } = useFetch({
    onSuccess: (payload) => {
      dispatch({
        type: AppActionTypes.SET_DATA,
        payload: {
          data: payload.data,
          headerLink: payload.headerLink,
          totalCount: payload.totalCount,
        },
      });

      appScrollIntoView(scrollContainer);
    },
  });

  return { reFetchReviews };
};

export default useReFetchReviews;
