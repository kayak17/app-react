import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { setActiveOffer, setActivePinId } from './actions';
import { InitialValues } from './constants';

const activeOffer = handleActions(
  {
    [setActiveOffer]: (_state, action) => action.payload,
  },
  InitialValues.ACTIVE_OFFER
);

const activePinId = handleActions(
  {
    [setActivePinId]: (_state, action) => action.payload,
  },
  InitialValues.PIN_ID
);

export default combineReducers({
  activeOffer,
  activePinId,
});
