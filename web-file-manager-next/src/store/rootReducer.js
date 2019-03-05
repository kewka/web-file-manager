import { combineReducers } from 'redux';
import drives from './drives/reducer';
import host from './host/reducer';

export default combineReducers({
  drives,
  host
});
