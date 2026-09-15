import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || (err.status ? err.status : 500);
  const correlationId = req.headers['x-correlation-id'];

  logger.error('Unhandled request error', {
    correlationId,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    statusCode
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.name || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
      correlationId,
      timestamp: new Date().toISOString()
    }
  });
};
