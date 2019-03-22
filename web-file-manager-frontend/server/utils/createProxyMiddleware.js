const proxy = require('express-http-proxy');

const createProxyMiddleware = (pathname = '/') =>
  proxy(process.env.API_HOST, {
    proxyReqOptDecorator: proxyReqOpts => {
      proxyReqOpts.rejectUnauthorized = false;
      return proxyReqOpts;
    },
    proxyReqPathResolver: req => pathname + req.url
  });

module.exports = createProxyMiddleware;
