import express from 'express';
import validator from '@/utils/api/validator';
import errorHandler from '@/utils/api/errorHandler';
import directoryRouter from './directory';
import fileRouter from './file';
import drivesRouter from './drives';

export default express.Router()
// Api validations
.use(validator)
// Api routes
.use(directoryRouter)
.use(fileRouter)
.use(drivesRouter)
// Error handler
.use(errorHandler);
