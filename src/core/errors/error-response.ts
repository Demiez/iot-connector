import { ErrorResponseTypes } from '../enums/error-response-types.enum';

// Required for generic handling
/* eslint-disable */
type errorDetailsType = any[] | any;

export class ErrorResponse extends Error {
  public type: ErrorResponseTypes;

  public errorCode: string;

  public errorDetails: errorDetailsType;

  // to adopt MongoError handling
  public code?: number;

  constructor(errorCode: string, errorDetails: errorDetailsType = []) {
    super(errorCode);
    this.errorCode = errorCode;
    this.errorDetails = errorDetails;
    this.type = ErrorResponseTypes.INTERNAL_SERVER_ERROR;
  }
}
export class ForbiddenError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.FORBIDDEN;
  }
}
export class UnauthorizedError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.UNAUTHORIZED;
  }
}
export class NotFoundError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.NOT_FOUND;
  }
}
export class InternalServerError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.BAD_REQUEST;
  }
}
