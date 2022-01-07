import { lazy, Suspense } from 'react';
import MainLayout from '~/layouts/main/main';

const PageLogin = lazy(() => import('../content/content'));

const PageLoginWrapper = () => {
  return (
    <Suspense fallback={null}>
      <MainLayout>
        <PageLogin />
      </MainLayout>
    </Suspense>
  );
};

export default PageLoginWrapper;
