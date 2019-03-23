require('dotenv').load();
require('./utils/logger');

const bodyParser = require('body-parser');
const express = require('express');
const next = require('next');

const getLocalIp = require('./utils/getLocalIp');

const createProxyMiddleware = require('./utils/createProxyMiddleware');

const port = +process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const localIp = getLocalIp();
const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.use(bodyParser.json());
  server.use('/api', createProxyMiddleware('/api'));
  server.use('/services', createProxyMiddleware('/services'));

  server.get('*', handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Local: http://localhost:${port}`);
    localIp && console.log(`> Network: http://${localIp}:${port}`);
  });
});
