import {
  AppActionTypes,
  AppMessages,
  ToastColors,
  ToastTypes,
} from '~/constants';

export const capitalizeFirstLetter = (str) => (
  str.charAt(0).toUpperCase() + str.slice(1)
);

export const getEmptyArray = (arrLength) => (
  new Array(arrLength).fill(undefined)
);

export const getToastSetting = ({
  position = 'bottom-center',
  toastType = ToastTypes.DEFAULT,
}) => ({
  duration: 5000,
  position,
  style: {
    border: `1px solid ${ToastColors[toastType]}`,
    padding: '16px',
  },
});

export const getUnknownActionTypeMsg = (componentName) => (
  `${AppActionTypes.UNKNOWN_ACTION_TYPE}${componentName}`
);

export const throwErrorToBoundary = (
  msg = AppMessages.DATA_LOADING_ERROR
) => {
  throw new Error(msg);
};
