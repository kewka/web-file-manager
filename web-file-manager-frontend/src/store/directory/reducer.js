import {
  FETCH_DIRECTORY,
  SEARCH_DIRECTORY,
  DELETE_DIRECTORY_ITEM,
  RENAME_DIRECTORY_ITEM
} from './constants';

const initialState = {
  isPending: false,
  data: null,
  error: null,
  search: []
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_DIRECTORY}_PENDING`:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case `${FETCH_DIRECTORY}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case `${FETCH_DIRECTORY}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    case `${SEARCH_DIRECTORY}_FULFILLED`:
      return {
        ...state,
        search: action.payload
      };

    case `${DELETE_DIRECTORY_ITEM}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            directories: state.data.content.directories.filter(directory => {
              return directory.path !== action.meta.directoryPath;
            })
          }
        }
      };

    case `${RENAME_DIRECTORY_ITEM}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            directories: state.data.content.directories.map(directory => {
              if (directory.path === action.meta.directoryPath) {
                return {
                  ...directory,
                  ...action.payload
                };
              }

              return directory;
            })
          }
        }
      };
      return { ...state };
    default:
      return state;
  }
}
