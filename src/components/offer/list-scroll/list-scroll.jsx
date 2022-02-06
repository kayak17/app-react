import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { setIsLoading } from '~/modules/process';
import { FetchingStatuses } from '~/constants';
import { refPropTypes } from '~/prop-types';

const OffersListScroll = ({
  render,
  containerClass,
  headerLinkNext,
  scrollContainer,
  setScrolledOffers,
}) => {
  const dispatch = useDispatch();

  const handleScrollOnBottom = useCallback(() => {
    if (headerLinkNext.length) {
      fetchData(headerLinkNext);
    }
  }, [headerLinkNext, fetchData]);

  const listRef = useBottomScrollListener(handleScrollOnBottom);

  const { state, fetchData } = useFetch({
    onRequest: () => {
      dispatch(setIsLoading(true));
    },
    onSuccess: (payload) => {
      setScrolledOffers(payload);
    },
  });

  useEffect(() => {
    if (state.status === FetchingStatuses.LOADING) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, state.status]);

  return (
    <div
      className={clsx('overflow-auto position-relative', containerClass)}
      ref={listRef}
    >
      <div
        className="position-absolute top-0 w-100"
        ref={scrollContainer}
      />
      {render()}
    </div>
  );
}

OffersListScroll.propTypes = {
  render: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
  headerLinkNext: PropTypes.string.isRequired,
  scrollContainer: refPropTypes,
  setScrolledOffers: PropTypes.func.isRequired,
};

export default OffersListScroll;
