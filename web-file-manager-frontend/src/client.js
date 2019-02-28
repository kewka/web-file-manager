import React from 'react';
import { hydrate } from 'react-dom';
import { ensureReady } from '@jaredpalmer/after';
import routes from './routes';

import App from './App';

ensureReady(routes).then(data =>
  hydrate(<App data={data} />, document.getElementById('root'))
);

if (module.hot) {
  module.hot.accept();
}
