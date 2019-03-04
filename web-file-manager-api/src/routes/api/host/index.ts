import express from 'express';
import createResponse from '@/utils/api/createResponse';
import HostModel from '@/models/HostModel';

export default express.Router()
.post('/host.get', (req, res, next) => {
    try {
        return res.json(createResponse(new HostModel()));
    } catch (e) {
        next(e);
    }
});
