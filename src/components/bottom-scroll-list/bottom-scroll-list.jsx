import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import useFetch from '~/hooks/use-fetch/use-fetch';
import { setIsLoading } from '~/modules/process';

const BottomScrollList = ({
  Content,
  containerClass,
  headerLinkNext,
  setScrolledItems,
}) => {
  const dispatch = useDispatch();

  const handleScrollOnBottom = useCallback(() => {
    if (headerLinkNext.length) {
      fetchData(headerLinkNext);
    }
  }, [headerLinkNext, fetchData]);

  const listRef = useBottomScrollListener(handleScrollOnBottom);

  const { fetchData } = useFetch({
    onRequest: () => {
      dispatch(setIsLoading(true));
    },
    onSuccess: (payload) => {
      setScrolledItems(payload);
      dispatch(setIsLoading(false));
    },
    onError: () => {
      dispatch(setIsLoading(false));
    },
  });

  return (
    <div
      className={clsx('overflow-auto', containerClass)}
      ref={listRef}
    >
      {<Content />}
    </div>
  );
}

BottomScrollList.propTypes = {
  Content: PropTypes.elementType.isRequired,
  containerClass: PropTypes.string,
  headerLinkNext: PropTypes.string.isRequired,
  setScrolledItems: PropTypes.func.isRequired,
};

export default BottomScrollList;
