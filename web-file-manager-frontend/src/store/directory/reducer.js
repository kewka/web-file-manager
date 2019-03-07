import { FETCH_DIRECTORY, SEARCH_DIRECTORY } from './constants';

const initialState = {
  isPending: false,
  data: null,
  error: null,
  search: []
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_DIRECTORY}_PENDING`:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case `${FETCH_DIRECTORY}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case `${FETCH_DIRECTORY}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    case `${SEARCH_DIRECTORY}_FULFILLED`:
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
}
