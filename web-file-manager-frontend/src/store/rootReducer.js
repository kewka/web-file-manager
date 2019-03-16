import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import drives from './drives/reducer';
import host from './host/reducer';
import directory from './directory/reducer';

export default combineReducers({
  form,
  drives,
  host,
  directory
});
