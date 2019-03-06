import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { registerStore } from '~/services/store';

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [thunk, promise];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const enhancers = composeEnhancers(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancers);
  registerStore(store);

  return store;
}
