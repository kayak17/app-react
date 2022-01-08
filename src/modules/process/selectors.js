import { AppReducers } from '~/constants';

const PROCESS = AppReducers.PROCESS;

export const getIsLoading = (state) => state[PROCESS].isLoading;
