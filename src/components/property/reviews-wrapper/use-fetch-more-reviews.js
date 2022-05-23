import PropTypes from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { AppActionTypes } from '~/constants';
import {
  getItemOrNullPropTypes,
  refPropTypes,
  reviewsPropTypes,
} from '~/prop-types';

const useFetchMoreReviews = (props) => {
  const HOOK_NAME = 'useFetchMoreReviews';

  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    reviewsData: getItemOrNullPropTypes(reviewsPropTypes),
    appScrollIntoView: PropTypes.func.isRequired,
    scrollContainer: refPropTypes,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    dispatch,
    reviewsData,
    appScrollIntoView,
    scrollContainer,
  } = props;

  const { fetchData: fetchMoreReviews } = useFetch({
    onSuccess: (payload) => {
      dispatch({
        type: AppActionTypes.SET_SCROLLED_DATA,
        payload: {
          data: reviewsData.concat(payload.data),
          headerLink: payload.headerLink,
        },
      });

      appScrollIntoView(scrollContainer);
    },
  });

  return { fetchMoreReviews };
};

export default useFetchMoreReviews;
