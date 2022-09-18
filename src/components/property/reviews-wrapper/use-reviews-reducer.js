import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AppActionTypes } from '~/constants';
import { getItemOrNullPropTypes, reviewsPropTypes } from '~/prop-types';
import { throwUnknownActionError } from '~/utils';

const useReviewsReducer = (props) => {
  const HOOK_NAME = 'useReviewsReducer';

  const propTypes = {
    reviewsData: PropTypes.shape({
      data: getItemOrNullPropTypes(reviewsPropTypes),
      headerLink: getItemOrNullPropTypes(PropTypes.object.isRequired),
      totalCount: getItemOrNullPropTypes(PropTypes.string.isRequired),
    }).isRequired,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const { reviewsData } = props;

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.SET_DATA:
        return {
          ...state,
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
        throwUnknownActionError(HOOK_NAME);
    }
  };

  const [reviews, dispatch] = useReducer(reducer, reviewsData);

  return { reviews, dispatch };
};

export default useReviewsReducer;
