const express = require('express');
const request = require('request');

module.exports = express.Router().post('/*', (req, res) => {
  const url = process.env.API_URL + req.path;
  const options = {
    body: req.body,
    json: true
  };

  request.post(url, options, (err, response, body) => {
    if (err) {
      console.error(err);
      const { message } = err;
      return res.status(500).json({ error: { message } });
    } else if (response) {
      return res.status(response.statusCode).json(body);
    }
  });
});
