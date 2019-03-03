const express = require('express');
const request = require('request');

module.exports = express.Router().post('/*', (req, res) => {
  const body = JSON.stringify(req.body);
  return request.post(process.env.API_URL + req.path, { body }).pipe(res);
});
