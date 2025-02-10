import { Router } from 'express';
import { getApplications, getApplication } from '@/controllers/application.controller';

const applicationsRouter = Router();

applicationsRouter.get('/', getApplications);
applicationsRouter.get('/:applicationId', getApplication);

export default applicationsRouter;
