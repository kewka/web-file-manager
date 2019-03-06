import { FETCH_HOST } from './constants';

const initialState = {
  isPending: false,
  data: null,
  error: null
};

export default function host(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_HOST}_PENDING`:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case `${FETCH_HOST}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload.error
      };
    case `${FETCH_HOST}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        data: action.payload.response
      };
    default:
      return state;
  }
}
