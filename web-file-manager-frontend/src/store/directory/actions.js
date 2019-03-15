import apiClient from '~/services/apiClient';
import { FETCH_DIRECTORY, SEARCH_DIRECTORY } from './constants';

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
