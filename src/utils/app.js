import {
  AppActionTypes,
  AppMessages,
  ToastColors,
  ToastTypes,
} from '~/constants';

export const appScrollTo = (scrollContainer) => {
  if (
    scrollContainer && scrollContainer.current &&
    scrollContainer.current.parentElement
  ) {
    scrollContainer.current.parentElement.scrollTo(0, 0);
  }
};

export const appScrollIntoView = (scrollContainer) => {
  if (scrollContainer && scrollContainer.current) {
    scrollContainer.current.scrollIntoView();
  }
};

export const capitalizeFirstLetter = (str) => (
  str.charAt(0).toUpperCase() + str.slice(1)
);

export const copyMap = (existingMap) => (
  new Map(JSON.parse(
    JSON.stringify(Array.from(existingMap))
  ))
);

export const getAuthHeader = (token) => (
  {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  }
);

export const getArrayOfUndefineds = (arrLength) => (
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

export const throwErrorToBoundary = (
  msg = AppMessages.DATA_LOADING_ERROR
) => {
  throw new Error(msg);
};

export const throwUnknownActionError = (componentName) => {
  throw new Error(`${AppActionTypes.UNKNOWN_ACTION_TYPE}${componentName}`);
};
