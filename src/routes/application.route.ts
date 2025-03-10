import { Router } from 'express';
import {
  getApplications,
  getApplication,
  newApplication,
  updateApplication,
  deleteApplication,
} from '@/controllers/application.controller';

const applicationsRouter = Router();

applicationsRouter.get('/', getApplications);
applicationsRouter.get('/:applicationId', getApplication);
applicationsRouter.post('/', newApplication);
applicationsRouter.put('/:applicationId', updateApplication);
applicationsRouter.delete('/:applicationId', deleteApplication);

export default applicationsRouter;
