import express from 'express';

export default express.Router().post('/', (req, res) => {
  return res.json({ response: null });
});
