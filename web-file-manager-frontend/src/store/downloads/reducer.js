import omit from 'lodash/omit';
import {
  ADD_DOWNLOAD_ITEM,
  CLEAR_DOWNLOADS,
  REMOVE_DOWNLOAD_ITEM
} from './constants';
import { persistReducer } from 'redux-persist';

const initialState = {
  data: {}
};

function downloads(state = initialState, action) {
  switch (action.type) {
    case ADD_DOWNLOAD_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [action.item.downloadId]: action.item
        }
      };

    case REMOVE_DOWNLOAD_ITEM:
      return {
        ...state,
        data: omit(state.data, action.downloadId)
      };

    case CLEAR_DOWNLOADS:
      return initialState;

    default:
      return state;
  }
}

export default (process.browser
  ? persistReducer(
      {
        key: 'downloads',
        storage: require('redux-persist/lib/storage').default,
        whitelist: ['data']
      },
      downloads
    )
  : downloads);
