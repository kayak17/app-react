import { Component } from 'react';
import PropTypes from 'prop-types';
import { AppMessages } from '~/constants';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    const { setIsLoading = () => false } = this.props;

    setIsLoading(false);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <p className="app-title page-content-title text-center">
            {AppMessages.SOMETHING_WENT_WRONG}
          </p>
          <p className="text-center">
            {this.state.error && this.state.error.toString()}
          </p>
        </>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  setIsLoading: PropTypes.func,
};

export default ErrorBoundary;
