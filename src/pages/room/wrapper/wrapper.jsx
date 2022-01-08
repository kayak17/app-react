import { lazy } from 'react';
import PageWrapper from '~/components/page-wrapper/page-wrapper';
import CommonLayout from '~/layouts/common/common';

const PageRoom = lazy(() => import('../content/content'));

const PageRoomWrapper = () => {
  return (
    <PageWrapper
      isSpinner={false}
      Layout={CommonLayout}
      PageContent={PageRoom}
    />
  );
};

export default PageRoomWrapper;
