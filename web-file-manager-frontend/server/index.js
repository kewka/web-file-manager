require('dotenv').load();

const bodyParser = require('body-parser');
const express = require('express');
const next = require('next');

const port = +process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.use(bodyParser.json());
  server.get('*', handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
