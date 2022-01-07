import { lazy, Suspense } from 'react';

const PageSignUp = lazy(() => import('../content/content'));

const PageSignUpWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageSignUp />
    </Suspense>
  );
};

export default PageSignUpWrapper;
