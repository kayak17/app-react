import clsx from 'clsx';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoading, setIsLoading } from '~/modules/process';
import { AppSRTitles } from '~/constants';

const withSpinner = (WrappedComponent) => {
  const WithSpinnerHOC = (props) => {
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();

    const handleSetIsDataLoading = useCallback((flag) => {
      if (isLoading !== flag) {
        dispatch(setIsLoading(flag));
      }
    }, [dispatch, isLoading]);

    return (
      <>
        <div className={clsx(
          { 'app-full-viewport app-disabled': isLoading }
        )}>
          <WrappedComponent 
            isLoading={isLoading}
            setIsLoading={handleSetIsDataLoading}
            {...props} 
          />
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
