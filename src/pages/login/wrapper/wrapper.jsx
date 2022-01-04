import { lazy, Suspense } from 'react';

const PageLogin = lazy(() => import('../content/content'));

const PageLoginWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageLogin />
    </Suspense>
  );
};

export default PageLoginWrapper;
