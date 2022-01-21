import { lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import MainLayout from '~/layouts/main/main';

const PageSignUp = lazy(() => import('../content/content'));

const PageSignUpWrapper = ({ setIsLoading }) => {
  return (
    <MainLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageSignUp />
      </ErrorBoundary>
    </MainLayout>
  );
};

PageSignUpWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageSignUpWrapper;
