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
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <p className="mt-5">
            {AppMessages.SOMETHING_WENT_WRONG}
          </p>
          <p className="mb-5 text-center">
            {this.state.error && this.state.error.toString()}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
