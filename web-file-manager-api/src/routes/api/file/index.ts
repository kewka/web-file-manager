import express from 'express';
import createResponse from '@/utils/api/createResponse';
import FileModel from '@/models/FileModel';

interface IFileGetParams {
    filePath: string;
}

export default express.Router()
.post('/file.get', (req, res, next) => {
    try {
        const { filePath } = req.body as IFileGetParams;
        const file = new FileModel(filePath);
        return res.json(createResponse(file));
    } catch (e) {
        next(e);
    }
});
