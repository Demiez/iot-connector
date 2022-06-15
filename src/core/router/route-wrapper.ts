import { NextFunction, Request } from 'express';
import { RequestHandler, Response } from 'express-serve-static-core';
import { logger } from '../utils';

export function wrapRouteAction(action: RequestHandler) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
      );
      await Promise.resolve(action(req, res, next));
    } catch (e) {
      logger.error('', e);
      next(e);
    }
  };
}
