import type { Response, NextFunction } from 'express';
import * as UserService from '@/services/user.service';

export async function getUsers(req: any, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getUsers();

    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: any, res: Response, next: NextFunction) {
  try {
    const user = await UserService.getUser(req);

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}
