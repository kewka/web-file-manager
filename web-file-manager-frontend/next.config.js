const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    config.plugins.push(
      new Dotenv({
        systemvars: true
      })
    );

    return config;
  }
});
