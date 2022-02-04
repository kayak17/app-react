import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PageFavoritesContent from '../content/content';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { getFavoriteOffersIdsByUser } from '~/modules/favorites';
import { AppMessages, FetchingStatuses } from '~/constants';
import {
  getFavoriteOffersURL,
  getOffersMapByCity,
  getUpdatedOffersMap,
  throwErrorToBoundary,
} from '~/utils';

const PageFavoritesWrapper = ({ setIsLoading }) => {
  const favoriteOffersIdsByUser = useSelector(getFavoriteOffersIdsByUser);
  const [favoriteOffersIds, setFavoriteOffersIds] = useState(favoriteOffersIdsByUser);
  const [offersMapByCity, setOffersMapByCity] = useState(undefined);

  const { state } = useFetch({
    url: getFavoriteOffersURL(favoriteOffersIdsByUser),
    onRequest: () => {
      setIsLoading(true);
    },
    onSuccess: (payload) => {
      setOffersMapByCity(getOffersMapByCity(payload.data));
    },
  });

  const isError = state.status === FetchingStatuses.ERROR;
  const isLoaded = state.status === FetchingStatuses.LOADED;

  useEffect(() => {
    if (isError || isLoaded) {
      setIsLoading(false);
    }
  }, [
    isError,
    isLoaded,
    setIsLoading,
  ]);

  useEffect(() => {
    if (isLoaded && !isEqual(favoriteOffersIds, favoriteOffersIdsByUser)) {
      setOffersMapByCity(
        getUpdatedOffersMap(offersMapByCity, favoriteOffersIdsByUser)
      );
      setFavoriteOffersIds(favoriteOffersIdsByUser);
    }
  }, [
    isLoaded,
    offersMapByCity,
    favoriteOffersIds,
    favoriteOffersIdsByUser,
  ]);

  if (isError) {
    throwErrorToBoundary(AppMessages.DATA_LOADING_ERROR);
  }

  return (
    <PageFavoritesContent
      isLoaded={isLoaded}
      offersMapByCity={offersMapByCity}
    />
  );
};

PageFavoritesWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageFavoritesWrapper;
