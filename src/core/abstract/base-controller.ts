import { Response } from 'express';

import { ErrorResponse } from '../errors/error-response';

export default class BaseController {
  /* eslint-disable */
  public sendSuccessResponse(res: Response, data: any = {}): Response {
    return res.status(200).json(data);
  }

  public sendResetContentResponse(res: Response, data: any = {}): Response {
    return res.status(205).json(data);
  }

  public sendNotModifiedResponse(res: Response, data: any = {}): Response {
    return res.status(304).json(data);
  }

  public sendUnauthorized(res: Response, error: ErrorResponse): Response {
    return res.status(401).json(error);
  }

  public sendForbidden(res: Response, error: ErrorResponse): Response {
    return res.status(403).send(error);
  }

  public sendNotFound(res: Response, error: ErrorResponse = null): Response {
    return res.status(404).send(error);
  }

  public sendInternalServerError(
    res: Response,
    error: ErrorResponse
  ): Response {
    return res.status(500).send(error);
  }
}
