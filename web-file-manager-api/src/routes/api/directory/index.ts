import express from 'express';
import DirectoryModel from '@/models/DirectoryModel';
import createResponse from '@/utils/api/createResponse';

interface IDirectoryGetParams {
    directoryPath: string;
}

export default express.Router()
.post('/directory.get', (req, res, next) => {
    try {
        const { directoryPath } = req.body as IDirectoryGetParams;
        const directory = new DirectoryModel(directoryPath);
        directory.loadContent();
        return res.json(createResponse(directory));
    } catch (e) {
        next(e);
    }
});
