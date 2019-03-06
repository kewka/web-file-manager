import apiClient from '~/services/apiClient';
import { FETCH_HOST } from './constants';

export function fetchHost() {
  return dispatch => {
    const payload = apiClient('host.get');
    return dispatch({
      type: FETCH_HOST,
      payload
    });
  };
}
