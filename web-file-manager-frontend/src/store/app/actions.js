import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

export const showNotification = notification => ({
  type: SHOW_NOTIFICATION,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification
  }
});

export const showErrorNotification = message => {
  return showNotification({
    message,
    options: { variant: 'error' }
  });
};

export const hideNotification = key => ({
  type: HIDE_NOTIFICATION,
  key
});
