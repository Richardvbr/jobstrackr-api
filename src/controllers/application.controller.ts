import type { Response, NextFunction } from 'express';
import type { Application } from '@/models/application.model';
import * as ApplicationService from '@/services/application.service';

export async function getApplications(req: any, res: Response, next: NextFunction) {
  const { id } = req.user ?? {};

  try {
    const applications = await ApplicationService.getApplications(id);

    res.status(200).json({ data: applications });
  } catch (error) {
    next(error);
  }
}

export async function getApplication(req: any, res: Response, next: NextFunction) {
  const applicationId = req.params.applicationId;
  const { id } = req.user ?? {};

  try {
    const application = await ApplicationService.getApplication(id, applicationId);

    res.status(200).json({ data: application });
  } catch (error) {
    next(error);
  }
}

export async function newApplication(req: any, res: Response, next: NextFunction) {
  const applicationId = req.params.applicationId;
  const applicationBody: Application = req.body;
  const { id } = req.user ?? {};

  try {
    const application = await ApplicationService.updateApplication(
      id,
      applicationId,
      applicationBody
    );

    res.status(200).json({ data: application });
  } catch (error) {
    next(error);
  }
}

export async function updateApplication(req: any, res: Response, next: NextFunction) {
  const applicationId = req.params.applicationId;
  const applicationBody: Application = req.body;
  const { id } = req.user ?? {};

  try {
    const application = await ApplicationService.updateApplication(
      id,
      applicationId,
      applicationBody
    );

    res.status(200).json({ data: application });
  } catch (error) {
    next(error);
  }
}

export async function deleteApplication(req: any, res: Response, next: NextFunction) {
  const applicationId = req.params.applicationId;
  const { id } = req.user ?? {};

  try {
    const application = await ApplicationService.deleteApplication(id, applicationId);

    res.status(200).json({ data: application });
  } catch (error) {
    next(error);
  }
}
