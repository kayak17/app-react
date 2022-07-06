import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageCountersWrapper = lazy(() => import('../content/content'));

const PageCountersContainer = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageCountersWrapper}
    />
  );
};

export default PageCountersContainer;
