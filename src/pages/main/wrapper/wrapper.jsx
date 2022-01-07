import { lazy, Suspense } from 'react';
import MainLayout from '~/layouts/main/main';

const PageMain = lazy(() => import('../content/content'));

const PageMainWrapper = () => {
  return (
    <Suspense fallback={null}>
      <MainLayout>
        <PageMain />
      </MainLayout>
    </Suspense>
  );
};

export default PageMainWrapper;
