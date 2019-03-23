import apiClient from '~/services/apiClient';
import { FETCH_DRIVES } from './constants';
import { showErrorNotification } from '../app/actions';

export function fetchDrives() {
  return dispatch => {
    const payload = apiClient('drives');
    return dispatch({
      type: FETCH_DRIVES,
      payload
    }).catch(err => {
      dispatch(showErrorNotification(err.message));
      return Promise.reject(err);
    });
  };
}
