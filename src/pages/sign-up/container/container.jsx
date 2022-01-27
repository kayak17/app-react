import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageSignUpWrapper = lazy(() => import('../content/content'));

const PageSignUpContainer = () => {
  return (
    <PageWrapper
      Layout={MainLayout}
      PageContent={PageSignUpWrapper}
    />
  );
};

export default PageSignUpContainer;
