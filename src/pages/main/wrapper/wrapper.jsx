import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageMain = lazy(() => import('../content/content'));

const PageMainWrapper = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageMain}
    />
  );
};

export default PageMainWrapper;
