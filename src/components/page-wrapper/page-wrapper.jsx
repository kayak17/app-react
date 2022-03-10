import PropTypes from 'prop-types';
import ErrorBoundary from '../error-boundary/error-boundary';

const PageWrapper = ({ Layout, PageContent }) => {
  return (
    <div className="app-page-wrapper app-full-viewport">
      <Layout>
        <ErrorBoundary>
          <PageContent />
        </ErrorBoundary>
      </Layout>
    </div>
  );
};

PageWrapper.propTypes = {
  Layout: PropTypes.elementType.isRequired,
  PageContent: PropTypes.elementType.isRequired,
};

export default PageWrapper;
