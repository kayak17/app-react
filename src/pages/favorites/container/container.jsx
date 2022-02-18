import { lazy } from 'react';
import PageWrapperSpinner from '~/components/page-wrapper-spinner/page-wrapper-spinner';
import CommonLayout from '~/layouts/common/common';

const PageFavoritesWrapper = lazy(() => import('../wrapper/wrapper'));

const PageFavoritesContainer = () => {
  return (
    <PageWrapperSpinner
      Layout={CommonLayout}
      PageContent={PageFavoritesWrapper}
    />
  );
};

export default PageFavoritesContainer;
