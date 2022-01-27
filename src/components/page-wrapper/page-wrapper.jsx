import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from '../error-boundary/error-boundary';
import withSpinner from '~/hocs/with-spinner/with-spinner';
import { getIsLoading, setIsLoading } from '~/modules/process';

const PageWrapper = ({ Layout, PageContent }) => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const handleSetIsLoading = useCallback((flag) => {
    if (isLoading !== flag) {
      dispatch(setIsLoading(flag));
    }
  }, [dispatch, isLoading]);

  return (
    <Layout>
      <ErrorBoundary setIsLoading={handleSetIsLoading}>
        <PageContent
          isLoading={isLoading}
          setIsLoading={handleSetIsLoading}
        />
      </ErrorBoundary>
    </Layout>
  );
};

PageWrapper.propTypes = {
  Layout: PropTypes.elementType.isRequired,
  PageContent: PropTypes.elementType.isRequired,
};

export default withSpinner(PageWrapper);
