import { lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import CommonLayout from '~/layouts/common/common';

const PageFavorites = lazy(() => import('../content/content'));

const PageFavoritesWrapper = ({ setIsLoading }) => {
  return (
    <CommonLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageFavorites />
      </ErrorBoundary>
    </CommonLayout>
  );
};

PageFavoritesWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageFavoritesWrapper;
