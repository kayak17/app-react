import { lazy, Suspense } from 'react';

const PageMain = lazy(() => import('../content/content'));

const PageMainWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageMain />
    </Suspense>
  );
};

export default PageMainWrapper;
