import { lazy } from 'react';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageNotFound = lazy(() => import('../content/content'));

const PageNotFoundWrapper = () => {
  return (
    <MainLayout>
      <ErrorBoundary>
        <PageNotFound />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default PageNotFoundWrapper;
