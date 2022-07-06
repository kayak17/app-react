import { ActionTypes, InitialValues } from './constants';
import { isMultipleOfFour } from '~/utils';

const initialState = {
  totalCount: InitialValues.TOTAL_COUNT,
  counters: InitialValues.COUNTERS,
};

const countersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };

    case ActionTypes.SET_COUNTERS:
      return {
        ...state,
        counters: action.payload,
      };

    case ActionTypes.DECREMENT_COUNTER:
      return {
        ...state,
        counters: state.counters.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              value: item.value - 1,
            };
          }

          return item;
        }),
      };

    case ActionTypes.INCREMENT_COUNTER:
      return {
        ...state,
        counters: state.counters.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              value: item.value + 1,
            };
          }

          return item;
        }),
      };

    case ActionTypes.ADD_COUNTER:
      return {
        ...state,
        counters: [...state.counters, {
          id: action.payload,
          value: state.totalCount,
          isSpecial: isMultipleOfFour(state.counters.length + 1),
        }],
      };

    case ActionTypes.REMOVE_COUNTER:
      return {
        ...state,
        counters: state.counters
          .filter((item) => item.id !== action.payload)
          .map((item, idx) => {
            if (isMultipleOfFour(idx + 1)) {
              return {
                ...item,
                isSpecial: true,
              };
            }

            return {
              ...item,
              isSpecial: false,
            };
          }),
      };

    default:
      return state;
  }
};

export default countersReducer;
