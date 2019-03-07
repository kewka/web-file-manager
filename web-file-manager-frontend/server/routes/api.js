const proxy = require('express-http-proxy');

module.exports = proxy(process.env.API_HOST, {
  proxyReqOptDecorator: (proxyReqOpts, originalReq) => {
    proxyReqOpts.rejectUnauthorized = false;
    return proxyReqOpts;
  },
  proxyReqPathResolver: req => '/api' + req.url
});
