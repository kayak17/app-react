import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.less';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
