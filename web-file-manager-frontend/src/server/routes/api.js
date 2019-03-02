import express from 'express';
import request from 'request';

export default express.Router().post('/*', (req, res) => {
  const body = JSON.stringify(req.body);
  return request.post(process.env.API_URL + req.path, { body }).pipe(res);
});
