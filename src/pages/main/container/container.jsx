import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageMainWrapper = lazy(() => import('../wrapper/wrapper'));

const PageMainContainer = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageMainWrapper}
    />
  );
};

export default PageMainContainer;
