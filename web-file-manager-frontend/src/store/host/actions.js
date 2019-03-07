import apiClient from '~/services/apiClient';
import { FETCH_HOST } from './constants';

export function fetchHost() {
  return dispatch => {
    const payload = apiClient('host');
    return dispatch({
      type: FETCH_HOST,
      payload
    });
  };
}
