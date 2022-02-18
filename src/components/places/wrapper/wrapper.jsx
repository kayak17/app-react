import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PlacesContent from '~/components/places/content/content';
import PlacesContentPlaceholder from '~/components/places/content-placeholder/content-placeholder';
import { getOffersListType } from '~/modules/main';
import { InitialModulesValues } from '~/constants';
import { offersReducerPropTypes } from '~/prop-types';
import { throwErrorToBoundary } from '~/utils';

const PlacesWrapper = ({
  offersReducer,
  isOffersError,
  isOffersLoaded,
}) => {
  const offersListType = useSelector(getOffersListType) ||
    InitialModulesValues.OFFERS_LIST_TYPE;

  if (isOffersError) {
    throwErrorToBoundary();
  } else if (!isOffersLoaded) {
    return (
      <PlacesContentPlaceholder
        offersListType={offersListType}
      />
    );
  }

  return (
    <PlacesContent
      offersReducer={offersReducer}
      offersListType={offersListType}
    />
  );
};

PlacesWrapper.propTypes = {
  offersReducer: offersReducerPropTypes,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default PlacesWrapper;
