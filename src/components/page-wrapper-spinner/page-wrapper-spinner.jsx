import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from '../error-boundary/error-boundary';
import { getIsLoading, setIsLoading } from '~/modules/process';
import { AppSRTitles } from '~/constants';

const PageWrapperSpinner = ({ Layout, PageContent }) => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const handleSetIsLoading = useCallback((flag) => {
    if (isLoading !== flag) {
      dispatch(setIsLoading(flag));
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <div className={clsx('app-page-wrapper app-full-viewport',
        { 'app-disabled': isLoading }
      )}>
        <Layout>
          <ErrorBoundary setIsLoading={handleSetIsLoading}>
            <PageContent setIsLoading={handleSetIsLoading} />
          </ErrorBoundary>
        </Layout>
      </div>
      {isLoading && (
        <div className="app-spinner">
          <span className="visually-hidden">
            {AppSRTitles.LOADING}
          </span>
        </div>
      )}
    </>
  );
};

PageWrapperSpinner.propTypes = {
  Layout: PropTypes.elementType.isRequired,
  PageContent: PropTypes.elementType.isRequired,
};

export default PageWrapperSpinner;
