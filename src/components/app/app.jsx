import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import withLazy from '~/hocs/with-lazy/with-lazy';
import PageFavorites from '~/pages/favorites/wrapper/wrapper';
import PageLogin from '~/pages/login/wrapper/wrapper';
import PageMain from '~/pages/main/wrapper/wrapper';
import PageNotFound from '~/pages/not-found/wrapper/wrapper';
import PageSignUp from '~/pages/sign-up/wrapper/wrapper';
import PageRoom from '~/pages/room/wrapper/wrapper';
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
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default withLazy(App);
