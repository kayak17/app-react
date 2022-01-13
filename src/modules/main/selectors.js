import { AppReducers } from '~/constants';

const MAIN = AppReducers.MAIN;

export const getActiveCity = (state) => state[MAIN].activeCity;

export const getActiveCityId = (state) => (
  state[MAIN].activeCity && state[MAIN].activeCity.id
);

export const getActiveCityName = (state) => (
  state[MAIN].activeCity && state[MAIN].activeCity.name
);
