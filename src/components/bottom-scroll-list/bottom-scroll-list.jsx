import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import useFetchList from './use-fetch-list';

const BottomScrollList = ({
  Content,
  containerClass,
  headerLinkNext,
  setScrolledItems,
}) => {
  const { fetchData } = useFetchList({ setScrolledItems });

  const handleScrollOnBottom = useCallback(() => {
    if (headerLinkNext.length) {
      fetchData(headerLinkNext);
    }
  }, [headerLinkNext, fetchData]);

  const listRef = useBottomScrollListener(handleScrollOnBottom);

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
