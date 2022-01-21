import { lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageNotFound = lazy(() => import('../content/content'));

const PageNotFoundWrapper = ({ setIsLoading }) => {
  return (
    <MainLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageNotFound />
      </ErrorBoundary>
    </MainLayout>
  );
};

PageNotFoundWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageNotFoundWrapper;
