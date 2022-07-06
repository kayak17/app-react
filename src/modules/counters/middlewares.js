import { setTotalCount } from './actions';
import { ActionTypes } from './constants';
import { getCounters } from './selectors';

export const setTotalCounterMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type === ActionTypes.DECREMENT_COUNTER ||
    action.type === ActionTypes.INCREMENT_COUNTER ||
    action.type === ActionTypes.ADD_COUNTER ||
    action.type === ActionTypes.REMOVE_COUNTER
  ) {
    const state = store.getState();
    const counters = getCounters(state);

    const totalCount = counters.reduce((acc, item) => (
      acc + item.value
    ), 0);

    store.dispatch(setTotalCount(totalCount));
  }

  return result;
};
