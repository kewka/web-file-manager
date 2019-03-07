import apiClient from '~/services/apiClient';
import { FETCH_DIRECTORY } from './constants';

export function fetchDirectory(directoryPath) {
  return dispatch => {
    const payload = apiClient('directory', { params: { directoryPath } });
    return dispatch({
      type: FETCH_DIRECTORY,
      payload
    });
  };
}
