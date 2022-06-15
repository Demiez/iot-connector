import { Application, NextFunction, Request, Response } from 'express';
import { BaseStatus } from '../enums/base-statuses.enum';
import { ErrorResponseTypes } from '../enums/error-response-types.enum';
import { ErrorResponse } from '../errors';
import { FieldIsBadModel, StandardResponseViewModel } from '../view-models';

export default (app: Application): void => {
  app.use(
    // required for middleware
    // eslint-disable-next-line
    (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
      let errorMessage: string;

      if (
        error.errorDetails &&
        error.errorDetails.length > 0 &&
        error.errorDetails[0] instanceof FieldIsBadModel
      ) {
        errorMessage =
          error.message +
          ': ' +
          error.errorDetails
            .map((errorDetail: FieldIsBadModel) => errorDetail.message)
            .join(', ');
      } else {
        errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;
      }

      switch (error.type) {
        case ErrorResponseTypes.BAD_REQUEST:
          return res
            .status(BaseStatus.BAD_REQUEST)
            .send(
              new StandardResponseViewModel<ErrorResponse>(
                error,
                errorMessage,
                BaseStatus.BAD_REQUEST
              )
            );

        case ErrorResponseTypes.UNAUTHORIZED:
          return res
            .status(BaseStatus.UNAUTHORIZED)
            .send(
              new StandardResponseViewModel<ErrorResponse>(
                error,
                errorMessage,
                BaseStatus.UNAUTHORIZED
              )
            );

        case ErrorResponseTypes.FORBIDDEN:
          return res
            .status(BaseStatus.FORBIDDEN)
            .send(
              new StandardResponseViewModel<ErrorResponse>(
                error,
                errorMessage,
                BaseStatus.FORBIDDEN
              )
            );
        case ErrorResponseTypes.NOT_FOUND: {
          return res
            .status(BaseStatus.NOT_FOUND)
            .send(
              new StandardResponseViewModel<ErrorResponse>(
                error,
                errorMessage,
                BaseStatus.NOT_FOUND
              )
            );
        }
        default:
          return res
            .status(BaseStatus.INTERNAL_SERVER_ERROR)
            .send(
              new StandardResponseViewModel<ErrorResponse>(
                error,
                'Internal Server Error',
                BaseStatus.INTERNAL_SERVER_ERROR
              )
            );
      }
    }
  );
};
