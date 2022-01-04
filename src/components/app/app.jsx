import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageMain from '~/pages/main/wrapper/wrapper';
import { AppRoutes } from '~/constants';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.MAIN}
          element={<PageMain />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
