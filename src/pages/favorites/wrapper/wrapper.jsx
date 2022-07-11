import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageFavoritesContent from '../content/content';
import { fetchFavorites, getFavorites, getIsLoaded } from '~/modules/favorites';
import { AppTitles } from '~/constants';

const PageFavoritesWrapper = () => {
  const dispatch = useDispatch();
  const favoriteOffers = useSelector(getFavorites, isEqual);
  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.SAVED_LISTING}
      </h1>
      <PageFavoritesContent
        isLoaded={isLoaded}
        favoriteOffers={favoriteOffers}
      />
    </section>
  );
};

export default PageFavoritesWrapper;
