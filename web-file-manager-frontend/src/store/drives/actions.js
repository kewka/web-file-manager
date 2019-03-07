import apiClient from '~/services/apiClient';
import { FETCH_DRIVES } from './constants';

export function fetchDrives() {
  return dispatch => {
    const payload = apiClient('drives');
    return dispatch({
      type: FETCH_DRIVES,
      payload
    });
  };
}
