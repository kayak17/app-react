import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PlacesContent from '~/components/places/content/content';
import PlacesContentPlaceholder from '~/components/places/content-placeholder/content-placeholder';
import { getOffersListType } from '~/modules/main';
import { InitialModulesValues } from '~/constants';
import { offersReducerPropTypes, refPropTypes } from '~/prop-types';
import { throwErrorToBoundary } from '~/utils';

const PlacesWrapper = ({
  offersReducer,
  isOffersError,
  isOffersLoaded,
  scrollContainer,
  setScrolledOffers,
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
      scrollContainer={scrollContainer}
      setScrolledOffers={setScrolledOffers}
    />
  );
};

PlacesWrapper.propTypes = {
  offersReducer: offersReducerPropTypes,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  scrollContainer: refPropTypes,
  setScrolledOffers: PropTypes.func.isRequired,
};

export default PlacesWrapper;
