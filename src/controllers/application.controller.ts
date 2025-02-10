import type { Response, NextFunction } from 'express';
import * as ApplicationService from '@/services/application.service';

export async function getApplications(req: any, res: Response, next: NextFunction) {
  try {
    const applications = await ApplicationService.getApplications(req);

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
}

export async function getApplication(req: any, res: Response, next: NextFunction) {
  try {
    const application = await ApplicationService.getApplication(req);

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}
