import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from '../error-boundary/error-boundary';
import withSpinner from '~/hocs/with-spinner/with-spinner';
import { getIsLoading, setIsLoading } from '~/modules/process';

const PageWrapper = ({
  isSpinner = true,
  Layout,
  PageContent,
}) => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinner) {
      dispatch(setIsLoading(true));
    }
  }, [dispatch, isSpinner, setIsLoading]);

  const handleSetIsDataLoading = useCallback((flag) => {
    if (isLoading !== flag) {
      dispatch(setIsLoading(flag));
    }
  }, [dispatch, isLoading, setIsLoading]);

  return (
    <Layout>
      <ErrorBoundary setIsLoading={handleSetIsDataLoading}>
        <PageContent
          isLoading={isLoading}
          setIsLoading={handleSetIsDataLoading}
        />
      </ErrorBoundary>
    </Layout>
  );
};

PageWrapper.propTypes = {
  isSpinner: PropTypes.bool,
  Layout: PropTypes.elementType.isRequired,
  PageContent: PropTypes.elementType.isRequired,
};

export default withSpinner(PageWrapper);
