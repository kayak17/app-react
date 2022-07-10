import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { InitialValues, setActiveOffer } from '~/modules/offers-map';

const useOffersListHover = () => {
  const dispatch = useDispatch();

  const handleOfferCardMouseEnter = useCallback((offer) => {
    dispatch(setActiveOffer(offer));
  }, [dispatch]);

  const handleOfferCardMouseLeave = useCallback(() => {
    dispatch(setActiveOffer(InitialValues.ACTIVE_OFFER));
  }, [dispatch]);

  return {
    handleOfferCardMouseEnter,
    handleOfferCardMouseLeave,
  };
};

export default useOffersListHover;
