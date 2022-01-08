import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import CommonLayout from '~/layouts/common/common';

const PageFavorites = lazy(() => import('../content/content'));

const PageFavoritesWrapper = () => {
  return (
    <PageWrapper
      isSpinner={false}
      Layout={CommonLayout}
      PageContent={PageFavorites}
    />
  );
};

export default PageFavoritesWrapper;
