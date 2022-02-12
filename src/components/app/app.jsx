import { compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import withLazy from '~/hocs/with-lazy/with-lazy';
import withModal from '~/hocs/with-modal/with-modal';
import withToaster from '~/hocs/with-toaster/with-toaster';
import RoutesApp from '../routes-app/routes-app';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
};

const enhance = compose(
  withLazy,
  withModal,
  withToaster
);

export default enhance(App);
