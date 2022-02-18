import { lazy } from 'react';
import PageWrapperSpinner from '~/components/page-wrapper-spinner/page-wrapper-spinner';
import CommonLayout from '~/layouts/common/common';

const PageRoomWrapper = lazy(() => import('../wrapper/wrapper'));

const PageRoomContainer = () => {
  return (
    <PageWrapperSpinner
      Layout={CommonLayout}
      PageContent={PageRoomWrapper}
    />
  );
};

export default PageRoomContainer;
