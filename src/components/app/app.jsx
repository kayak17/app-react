import { compose } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import withLazy from '~/hocs/with-lazy/with-lazy';
import withModal from '~/hocs/with-modal/with-modal';
import withToaster from '~/hocs/with-toaster/with-toaster';
import PageFavorites from '~/pages/favorites/container/container';
import PageLogin from '~/pages/login/container/container';
import PageMain from '~/pages/main/container/container';
import PageNotFound from '~/pages/not-found/container/container';
import PageSignUp from '~/pages/sign-up/container/container';
import PageRoom from '~/pages/room/container/container';
import { AppRoutes } from '~/constants';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.MAIN}
          element={<PageMain />}
        />
        <Route
          path={AppRoutes.FAVORITES}
          element={
            <PrivateRoute
              redirectURL={AppRoutes.LOGIN}
              element={<PageFavorites />}
            />
          }
        />
        <Route
          path={AppRoutes.LOGIN}
          element={<PageLogin />}
        />
        <Route
          path={AppRoutes.SIGNUP}
          element={<PageSignUp />}
        />
        <Route
          path={AppRoutes.OFFER}
          element={<PageRoom />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const enhance = compose(
  withLazy,
  withModal,
  withToaster
);

export default enhance(App);
