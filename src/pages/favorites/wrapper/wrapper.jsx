import { lazy, Suspense } from 'react';
import CommonLayout from '~/layouts/main/main';

const PageFavorites = lazy(() => import('../content/content'));

const PageFavoritesWrapper = () => {
  return (
    <Suspense fallback={null}>
      <CommonLayout>
        <PageFavorites />
      </CommonLayout>
    </Suspense>
  );
};

export default PageFavoritesWrapper;
