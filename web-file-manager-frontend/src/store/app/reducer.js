import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

const initialState = {
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };

    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};
