import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import CommonLayout from '~/layouts/common/common';

const PageFavoritesWrapper = lazy(() => import('../wrapper/wrapper'));

const PageFavoritesContainer = () => {
  return (
    <PageWrapper
      Layout={CommonLayout}
      PageContent={PageFavoritesWrapper}
    />
  );
};

export default PageFavoritesContainer;
