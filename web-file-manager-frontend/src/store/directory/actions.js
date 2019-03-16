import apiClient from '~/services/apiClient';
import {
  FETCH_DIRECTORY,
  SEARCH_DIRECTORY,
  DELETE_DIRECTORY_ITEM
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
