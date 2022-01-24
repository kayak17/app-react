import { lazy } from 'react';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageSignUp = lazy(() => import('../content/content'));

const PageSignUpWrapper = () => {
  return (
    <MainLayout>
      <ErrorBoundary>
        <PageSignUp />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default PageSignUpWrapper;
