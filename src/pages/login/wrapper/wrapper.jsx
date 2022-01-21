import { lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageLogin = lazy(() => import('../content/content'));

const PageLoginWrapper = ({ setIsLoading }) => {
  return (
    <MainLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageLogin />
      </ErrorBoundary>
    </MainLayout>
  );
};

PageLoginWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageLoginWrapper;
