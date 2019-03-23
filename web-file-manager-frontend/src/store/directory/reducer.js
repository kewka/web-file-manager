import {
  FETCH_DIRECTORY,
  SEARCH_DIRECTORY,
  DELETE_DIRECTORY_ITEM,
  RENAME_DIRECTORY_ITEM,
  RESET_DIRECTORY_DATA,
  RENAME_FILE_ITEM
} from './constants';

const initialState = {
  isPending: false,
  data: null,
  error: null,
  search: []
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case `${DELETE_DIRECTORY_ITEM}_PENDING`:
    case `${RENAME_DIRECTORY_ITEM}_PENDING`:
    case `${RENAME_FILE_ITEM}_PENDING`:
    case `${FETCH_DIRECTORY}_PENDING`:
      return {
        ...state,
        isPending: true,
        error: null
      };

    case `${DELETE_DIRECTORY_ITEM}_REJECTED`:
    case `${RENAME_DIRECTORY_ITEM}_REJECTED`:
    case `${RENAME_FILE_ITEM}_REJECTED`:
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
        isPending: false,
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
        isPending: false,
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

    case `${RENAME_FILE_ITEM}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            files: state.data.content.files.map(file => {
              if (file.path === action.meta.filePath) {
                return {
                  ...file,
                  ...action.payload
                };
              }

              return file;
            })
          }
        }
      };

    case RESET_DIRECTORY_DATA:
      return {
        ...state,
        data: null
      };

    default:
      return state;
  }
}
