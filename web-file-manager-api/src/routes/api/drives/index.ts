import express from 'express';
import createResponse from '@/utils/api/createResponse';
import DriveModel from '@/models/DriveModel';

export default express.Router()
.post('/drives.get', async (req, res) => {
    const drives: DriveModel[] = await DriveModel.getDrives();
    return res.json(createResponse(drives));
});
