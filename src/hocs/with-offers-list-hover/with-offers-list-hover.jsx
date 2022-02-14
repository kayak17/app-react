import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveOffer } from '~/modules/offers-map';
import { InitialModulesValues } from '~/constants';

const withOffersListHover = (WrappedComponent) => {
  const WithOffersListHoverHOC = (props) => {
    const dispatch = useDispatch();

    const handleOfferCardMouseEnter = useCallback((offer) => {
      dispatch(setActiveOffer(offer));
    }, [dispatch]);

    const handleOfferCardMouseLeave = useCallback(() => {
      dispatch(setActiveOffer(InitialModulesValues.ACTIVE_OFFER));
    }, [dispatch]);

    return (
      <WrappedComponent
        {...props}
        handleOfferCardMouseEnter={handleOfferCardMouseEnter}
        handleOfferCardMouseLeave={handleOfferCardMouseLeave}
      />
    );
  };

  WithOffersListHoverHOC.displayName = 'WithOffersListHoverHOC';

  return WithOffersListHoverHOC;
};

export default withOffersListHover;
