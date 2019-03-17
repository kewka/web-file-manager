import { FETCH_DRIVES } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  data: {},
  error: null
};

export default function drives(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_DRIVES}_PENDING`:
      return {
        ...state,
        isPending: true,
        error: null
      };

    case `${FETCH_DRIVES}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_DRIVES}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        data: entityNormalize.toObject(action.payload, 'id')
      };

    default:
      return state;
  }
}
