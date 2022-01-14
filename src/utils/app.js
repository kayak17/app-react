import {
  AppActionTypes,
  ToastColors,
  ToastTypes,
} from '~/constants';

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
