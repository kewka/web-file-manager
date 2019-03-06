import apiClient from '~/services/apiClient';
import { FETCH_DRIVES } from './constants';

export function fetchDrives() {
  return dispatch => {
    const payload = apiClient('drives.get');
    return dispatch({
      type: FETCH_DRIVES,
      payload
    });
  };
}
