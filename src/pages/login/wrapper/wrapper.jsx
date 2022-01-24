import { lazy } from 'react';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageLogin = lazy(() => import('../content/content'));

const PageLoginWrapper = () => {
  return (
    <MainLayout>
      <ErrorBoundary>
        <PageLogin />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default PageLoginWrapper;
