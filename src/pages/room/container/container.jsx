import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import CommonLayout from '~/layouts/common/common';

const PageRoomWrapper = lazy(() => import('../wrapper/wrapper'));

const PageRoomContainer = () => {
  return (
    <PageWrapper
      Layout={CommonLayout}
      PageContent={PageRoomWrapper}
    />
  );
};

export default PageRoomContainer;
