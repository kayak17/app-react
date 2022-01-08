import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageNotFound = lazy(() => import('../content/content'));

const PageNotFoundWrapper = () => {
  return (
    <PageWrapper
      isSpinner={false}
      Layout={MainLayout}
      PageContent={PageNotFound}
    />
  );
};

export default PageNotFoundWrapper;
