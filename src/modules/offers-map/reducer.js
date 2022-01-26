import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setActiveOffer, setActivePinId } from './actions';
import { InitialModulesValues } from '~/constants';

const activeOffer = handleActions(
  {
    [setActiveOffer]: (_state, action) => action.payload,
  },
  InitialModulesValues.ACTIVE_OFFER
);

const activePinId = handleActions(
  {
    [setActivePinId]: (_state, action) => action.payload,
  },
  InitialModulesValues.PIN_ID
);

export default combineReducers({
  activeOffer,
  activePinId,
});
