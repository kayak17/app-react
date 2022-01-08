import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import MainLayout from '~/layouts/main/main';

const PageSignUp = lazy(() => import('../content/content'));

const PageSignUpWrapper = () => {
  return (
    <PageWrapper
      isSpinner={false}
      Layout={MainLayout}
      PageContent={PageSignUp}
    />
  );
};

export default PageSignUpWrapper;
