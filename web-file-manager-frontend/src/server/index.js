import express from 'express';
import { render } from '@jaredpalmer/after';

import routes from '~/routes';
import Document from '~/Document';

import apiRouter from './routes/api';
import renderer from './renderer';
import configureStore from '~/store';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/api', apiRouter)
  .get('/*', async (req, res) => {
    try {
      const store = configureStore();

      const html = await render({
        req,
        res,
        routes,
        assets,
        document: Document,
        customRenderer: renderer(store),
        store
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
