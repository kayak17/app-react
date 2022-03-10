import { compose } from 'redux';
import { useRoutes } from 'react-router-dom';
import withLazy from '~/hocs/with-lazy/with-lazy';
import withModal from '~/hocs/with-modal/with-modal';
import PageFavorites from '~/pages/favorites/container/container';
import PageLogin from '~/pages/login/container/container';
import PageMain from '~/pages/main/container/container';
import PageNotFound from '~/pages/not-found/container/container';
import PageSignUp from '~/pages/sign-up/container/container';
import PageRoom from '~/pages/room/container/container';
import PrivateRoute from '../private-route/private-route';
import { AppRoutes } from '~/constants';

const App = () => {
  return (
    useRoutes([
      {
        path: AppRoutes.MAIN,
        element: <PageMain />,
      },
      {
        path: AppRoutes.FAVORITES,
        element:
          <PrivateRoute
            redirectURL={AppRoutes.LOGIN}
            element={<PageFavorites />}
          />
      },
      {
        path: AppRoutes.LOGIN,
        element: <PageLogin />,
      },
      {
        path: AppRoutes.SIGNUP,
        element: <PageSignUp />,
      },
      {
        path: AppRoutes.OFFER,
        element: <PageRoom />,
      },
      {
        path: AppRoutes.ANY,
        element: <PageNotFound />,
      },
    ])
  );
};

const enhance = compose(
  withLazy,
  withModal
);

export default enhance(App);
