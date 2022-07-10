import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PlacesContent from '~/components/places/content/content';
import PlacesContentPlaceholder from '~/components/places/content-placeholder/content-placeholder';
import { InitialValues, getOffersListType } from '~/modules/main';
import { throwErrorToBoundary } from '~/utils';

const PlacesWrapper = ({ isOffersError, isOffersLoaded }) => {
  const offersListType = useSelector(getOffersListType) ||
    InitialValues.OFFERS_LIST_TYPE;

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
      offersListType={offersListType}
    />
  );
};

PlacesWrapper.propTypes = {
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default PlacesWrapper;
