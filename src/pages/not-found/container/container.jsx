import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageNotFoundWrapper = lazy(() => import('../content/content'));

const PageNotFoundContainer = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageNotFoundWrapper}
    />
  );
};

export default PageNotFoundContainer;
