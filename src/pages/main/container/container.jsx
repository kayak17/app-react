import { lazy } from 'react';
import PageWrapperSpinner from '~/components/page-wrapper-spinner/page-wrapper-spinner';
import MainLayout from '~/layouts/main/main';

const PageMainWrapper = lazy(() => import('../wrapper/wrapper'));

const PageMainContainer = () => {
  return (
    <PageWrapperSpinner
      Layout={MainLayout}
      PageContent={PageMainWrapper}
    />
  );
};

export default PageMainContainer;
