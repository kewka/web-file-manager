import apiClient from '~/services/apiClient';
import { FETCH_HOST } from './constants';
import { showErrorNotification } from '../app/actions';

export function fetchHost() {
  return (dispatch, state) => {
    const { host } = state();

    if (host.data) {
      return Promise.resolve(host.data);
    }

    const payload = apiClient('host');
    return dispatch({
      type: FETCH_HOST,
      payload
    }).catch(err => {
      dispatch(showErrorNotification(err.message));
      return Promise.reject(err);
    });
  };
}
