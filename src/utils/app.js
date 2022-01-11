import {
  ToastColors,
  ToastTypes,
} from '~/constants';

export const getToastSetting = (
  toastType = ToastTypes.DEFAULT
) => ({
  duration: 5000,
  position: 'bottom-center',
  style: {
    border: `1px solid ${ToastColors[toastType]}`,
    padding: '16px',
  },
});
