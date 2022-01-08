import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageLogin = lazy(() => import('../content/content'));

const PageLoginWrapper = () => {
  return (
    <PageWrapper
      isSpinner={false}
      Layout={MainLayout}
      PageContent={PageLogin}
    />
  );
};

export default PageLoginWrapper;
