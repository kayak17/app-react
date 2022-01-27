import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageLoginWrapper = lazy(() => import('../content/content'));

const PageLoginContainer = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageLoginWrapper}
    />
  );
};

export default PageLoginContainer;
