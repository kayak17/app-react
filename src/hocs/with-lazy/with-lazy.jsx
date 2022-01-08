import { Suspense } from 'react';
import ErrorBoundary from '~/components/error-boundary/error-boundary';

const withLazy = (WrappedComponent, fallback = null) => {
  const WithLazyHOC = (props) => {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback}>
          <WrappedComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  WithLazyHOC.displayName = 'WithLazyHOC';

  return WithLazyHOC;
};

export default withLazy;
