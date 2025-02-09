import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction) {
  try {
    const error = { ...err, message: err.message };

    console.error(err);

    res.status(error.statusCode ?? 500).json({
      success: false,
      error: error.message || 'Server Error',
    });
  } catch (error) {
    next(error);
  }
}

export default errorMiddleware;
