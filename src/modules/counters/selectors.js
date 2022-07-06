import { AppReducers } from '~/constants';

const COUNTERS = AppReducers.COUNTERS;

export const getTotalCount = (state) => state[COUNTERS].totalCount;
export const getCounters = (state) => state[COUNTERS].counters;
