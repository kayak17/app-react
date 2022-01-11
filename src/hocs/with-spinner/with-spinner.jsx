import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getIsLoading } from '~/modules/process';
import { AppSRTitles } from '~/constants';

const withSpinner = (WrappedComponent) => {
  const WithSpinnerHOC = (props) => {
    const isLoading = useSelector(getIsLoading);

    return (
      <>
        <div className={clsx(
          { 'app-full-viewport app-disabled': isLoading }
        )}>
          <WrappedComponent {...props} />
        </div>
        {isLoading && (
          <div className="app-spinner-over">
            <span className="visually-hidden">{AppSRTitles.LOADING}</span>
          </div>
        )}
      </>
    );
  };

  WithSpinnerHOC.displayName = 'WithSpinnerHOC';

  return WithSpinnerHOC;
};

export default withSpinner;
