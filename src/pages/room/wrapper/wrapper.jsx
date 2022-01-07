import { lazy, Suspense } from 'react';
import CommonLayout from '~/layouts/main/main';

const PageRoom = lazy(() => import('../content/content'));

const PageRoomWrapper = () => {
  return (
    <Suspense fallback={null}>
      <CommonLayout>
        <PageRoom />
      </CommonLayout>
    </Suspense>
  );
};

export default PageRoomWrapper;
