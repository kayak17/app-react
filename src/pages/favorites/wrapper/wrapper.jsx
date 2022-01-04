import { lazy, Suspense } from 'react';

const PageFavorites = lazy(() => import('../content/content'));

const PageFavoritesWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageFavorites />
    </Suspense>
  );
};

export default PageFavoritesWrapper;
