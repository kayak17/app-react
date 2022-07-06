import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createAPI } from './services';
import rootReducer from './modules';
import { setTotalCounterMiddleware } from './modules/counters';
import { logout } from './modules/user';

export const api = createAPI(
  () => store.dispatch(logout())
);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(setTotalCounterMiddleware)
  )
);

export const persistor = persistStore(store);
