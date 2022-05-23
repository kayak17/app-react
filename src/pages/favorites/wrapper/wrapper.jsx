import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PageFavoritesContent from '../content/content';
import usePrevious from '~/hooks/use-previous/use-previous';
import { getFavoriteOffersIdsByUser } from '~/modules/favorites';
import { AppMessages, AppTitles } from '~/constants';
import { copyMap, throwErrorToBoundary } from '~/utils';
import { getUpdatedOffersMap } from '../helpers';
import useFetchFavorites from './use-fetch-favorites';

const PageFavoritesWrapper = ({ setIsLoading }) => {
  const favoriteOffersIds = useSelector(getFavoriteOffersIdsByUser);
  const prevFavoriteOffersIds = usePrevious(favoriteOffersIds);
  const [offersMapByCity, setOffersMapByCity] = useState();

  const { isError, isLoaded } = useFetchFavorites({
    setIsLoading,
    favoriteOffersIds,
    setOffersMapByCity,
  });

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
