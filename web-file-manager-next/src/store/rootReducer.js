import { combineReducers } from 'redux';
import drives from './drives/reducer';
import host from './host/reducer';
import directory from './directory/reducer';

export default combineReducers({
  drives,
  host,
  directory
});
