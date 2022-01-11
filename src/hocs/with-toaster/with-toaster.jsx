import { Toaster } from 'react-hot-toast';

const withToaster = (WrappedComponent) => {
  const WithToasterHOC = (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <Toaster />
      </>
    );
  };

  WithToasterHOC.displayName = 'WithToasterHOC';

  return WithToasterHOC;
};

export default withToaster;
