import { AppReducers } from '~/constants';

const OFFERS_MAP = AppReducers.OFFERS_MAP;

export const getActiveOffer = (state) => state[OFFERS_MAP].activeOffer;
export const getActivePinId = (state) => state[OFFERS_MAP].activePinId;
