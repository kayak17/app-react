import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveOffer } from '~/modules/offers-map';
import { InitialModulesValues } from '~/constants';

const useOffersListHover = () => {
  const dispatch = useDispatch();

  const handleOfferCardMouseEnter = useCallback((offer) => {
    dispatch(setActiveOffer(offer));
  }, [dispatch]);

  const handleOfferCardMouseLeave = useCallback(() => {
    dispatch(setActiveOffer(InitialModulesValues.ACTIVE_OFFER));
  }, [dispatch]);

  return {
    handleOfferCardMouseEnter,
    handleOfferCardMouseLeave,
  };
};

export default useOffersListHover;
