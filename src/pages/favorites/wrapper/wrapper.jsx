import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PageFavoritesContent from '../content/content';
import useFetch from '~/hooks/use-fetch/use-fetch';
import usePrevious from '~/hooks/use-previous/use-previous';
import { getFavoriteOffersIdsByUser } from '~/modules/favorites';
import { AppMessages, AppTitles, FetchingStatuses } from '~/constants';
import { copyMap, getFavoriteOffersURL, throwErrorToBoundary } from '~/utils';
import { getOffersMapByCity, getUpdatedOffersMap } from '../helpers';

const PageFavoritesWrapper = ({ setIsLoading }) => {
  const favoriteOffersIds = useSelector(getFavoriteOffersIdsByUser);
  const prevFavoriteOffersIds = usePrevious(favoriteOffersIds);
  const [offersMapByCity, setOffersMapByCity] = useState();

  const { state } = useFetch({
    url: getFavoriteOffersURL(favoriteOffersIds),
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

  if (isError) {
    throwErrorToBoundary(AppMessages.DATA_LOADING_ERROR);
  }

  useEffect(() => {
    if (isLoaded && !isEqual(prevFavoriteOffersIds, favoriteOffersIds)) {
      setOffersMapByCity((prevOffersMapByCity) => (
        getUpdatedOffersMap(copyMap(prevOffersMapByCity), favoriteOffersIds)
      ));
    }
  }, [
    isLoaded,
    favoriteOffersIds,
    prevFavoriteOffersIds,
  ]);

  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.SAVED_LISTING}
      </h1>
      <PageFavoritesContent
        isLoaded={isLoaded}
        offersMapByCity={offersMapByCity}
      />
    </section>
  );
};

PageFavoritesWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageFavoritesWrapper;
