import { lazy, Suspense } from 'react';

const PageNotFound = lazy(() => import('../content/content'));

const PageNotFoundWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageNotFound />
    </Suspense>
  );
};

export default PageNotFoundWrapper;
