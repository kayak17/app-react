import { lazy, Suspense } from 'react';
import MainLayout from '~/layouts/main/main';

const PageNotFound = lazy(() => import('../content/content'));

const PageNotFoundWrapper = () => {
  return (
    <Suspense fallback={null}>
      <MainLayout>
        <PageNotFound />
      </MainLayout>
    </Suspense>
  );
};

export default PageNotFoundWrapper;
