import { lazy, Suspense } from 'react';

const PageRegistration = lazy(() => import('../content/content'));

const PageRegistrationWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageRegistration />
    </Suspense>
  );
};

export default PageRegistrationWrapper;
