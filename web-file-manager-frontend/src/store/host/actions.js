import apiClient from '~/services/apiClient';
import { FETCH_HOST } from './constants';

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
    });
  };
}
