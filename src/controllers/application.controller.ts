import type { Response, NextFunction } from 'express';
import * as ApplicationService from '@/services/application.service';

export async function getApplications(req: any, res: Response, next: NextFunction) {
  const { id } = req.user ?? {};

  try {
    const applications = await ApplicationService.getApplications(id);

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
}

export async function getApplication(req: any, res: Response, next: NextFunction) {
  const applicationId = req.params.applicationId;
  const { id } = req.user ?? {};

  try {
    const application = await ApplicationService.getApplication(id, applicationId);

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}
