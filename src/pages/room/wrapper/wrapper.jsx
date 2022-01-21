import { lazy } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '~/components/error-boundary/error-boundary';
import CommonLayout from '~/layouts/common/common';

const PageRoom = lazy(() => import('../content/content'));

const PageRoomWrapper = ({ setIsLoading }) => {
  return (
    <CommonLayout>
      <ErrorBoundary setIsLoading={setIsLoading}>
        <PageRoom />
      </ErrorBoundary>
    </CommonLayout>
  );
};

PageRoomWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageRoomWrapper;
