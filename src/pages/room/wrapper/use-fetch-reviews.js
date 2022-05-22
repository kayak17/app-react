import PropTypes from 'prop-types';
import useFetch from '~/hooks/use-fetch/use-fetch';

const useFetchReviews = (props) => {
  const HOOK_NAME = 'useFetchReviews';

  const propTypes = {
    reviewsUrl: PropTypes.string.isRequired,
    setReviewsData: PropTypes.func.isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    reviewsUrl,
    setReviewsData,
  } = props;

  const {
    isLoaded: isReviewsLoaded,
  } = useFetch({
    url: reviewsUrl,
    onSuccess: (payload) => {
      setReviewsData(payload);
    },
  });

  return { isReviewsLoaded };
};

export default useFetchReviews;
