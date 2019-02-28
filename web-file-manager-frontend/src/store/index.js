import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './rootReducer';
import { registerStore } from '~/services/store';

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancers = composeEnhancers(applyMiddleware(thunk, promise));

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('.', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  registerStore(store);

  return store;
}
