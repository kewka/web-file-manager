import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import drives from './drives/reducer';
import host from './host/reducer';
import directory from './directory/reducer';
import app from './app/reducer';

export default combineReducers({
  app,
  form,
  drives,
  host,
  directory
});
