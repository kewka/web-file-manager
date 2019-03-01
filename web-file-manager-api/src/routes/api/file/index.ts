import express from 'express';
import createResponse from '@/utils/api/createResponse';
import FileModel from '@/models/FileModel';

interface IFileGetParams {
    path: string;
}

export default express.Router()
.post('/file.get', (req, res, next) => {
    try {
        const { path } = req.body as IFileGetParams;
        const file = new FileModel(path);
        return res.json(createResponse(file));
    } catch (e) {
        next(e);
    }
});
