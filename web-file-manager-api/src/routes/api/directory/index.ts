import express from 'express';
import DirectoryModel from '@/models/DirectoryModel';
import createResponse from '@/utils/api/createResponse';

interface IDirectoryGetParams {
    path: string;
}

export default express.Router()
.post('/directory.get', (req, res, next) => {
    try {
        const { path } = req.body as IDirectoryGetParams;
        const directory = new DirectoryModel(path);
        directory.loadContent();
        return res.json(createResponse(directory));
    } catch (e) {
        next(e);
    }
});
