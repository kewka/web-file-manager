import { Router } from 'express';
import apiRouter from './api';

export default Router().use('/api', apiRouter);
