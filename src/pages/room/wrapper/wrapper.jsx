import { lazy, Suspense } from 'react';

const PageRoom = lazy(() => import('../content/content'));

const PageRoomWrapper = () => {
  return (
    <Suspense fallback={null}>
      <PageRoom />
    </Suspense>
  );
};

export default PageRoomWrapper;
