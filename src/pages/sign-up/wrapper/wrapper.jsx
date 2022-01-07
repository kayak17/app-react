import { lazy, Suspense } from 'react';
import MainLayout from '~/layouts/main/main';

const PageSignUp = lazy(() => import('../content/content'));

const PageSignUpWrapper = () => {
  return (
    <Suspense fallback={null}>
      <MainLayout>
        <PageSignUp />
      </MainLayout>
    </Suspense>
  );
};

export default PageSignUpWrapper;
