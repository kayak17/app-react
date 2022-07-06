import { ActionTypes } from './constants';

export const setTotalCount = (totalCount) => ({
  type: ActionTypes.SET_TOTAL_COUNT,
  payload: totalCount,
});

export const setCounters = (counters) => ({
  type: ActionTypes.SET_COUNTERS,
  payload: counters,
});

export const addCounter = (counter) => ({
  type: ActionTypes.ADD_COUNTER,
  payload: counter,
});

export const removeCounter = (counterId) => ({
  type: ActionTypes.REMOVE_COUNTER,
  payload: counterId,
});

export const decrementCounter = (counterId) => ({
  type: ActionTypes.DECREMENT_COUNTER,
  payload: counterId,
});

export const incrementCounter = (counterId) => ({
  type: ActionTypes.INCREMENT_COUNTER,
  payload: counterId,
});
