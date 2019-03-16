import apiClient from '~/services/apiClient';
import {
  FETCH_DIRECTORY,
  SEARCH_DIRECTORY,
  DELETE_DIRECTORY_ITEM,
  RENAME_DIRECTORY_ITEM
} from './constants';

export function fetchDirectory(directoryPath) {
  return dispatch => {
    const payload = apiClient('directory', { params: { directoryPath } });
    return dispatch({
      type: FETCH_DIRECTORY,
      payload
    });
  };
}

export function searchDirectory(query) {
  return dispatch => {
    const payload = apiClient('directory/search', {
      params: { query }
    });
    return dispatch({
      type: SEARCH_DIRECTORY,
      payload
    });
  };
}

export function deleteDirectoryItem(directoryPath) {
  return dispatch => {
    const payload = apiClient('directory', {
      method: 'DELETE',
      params: { directoryPath }
    });
    return dispatch({
      type: DELETE_DIRECTORY_ITEM,
      payload,
      meta: {
        directoryPath
      }
    });
  };
}

export function renameDirectoryItem(directoryPath, name) {
  return dispatch => {
    const payload = apiClient('directory/rename', {
      method: 'PUT',
      params: { directoryPath },
      body: { name }
    });

    return dispatch({
      type: RENAME_DIRECTORY_ITEM,
      payload,
      meta: {
        directoryPath
      }
    });
  };
}
