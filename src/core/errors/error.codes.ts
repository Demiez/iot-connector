import { BaseErrorCodes } from './base-error-codes';

export class ErrorCodes extends BaseErrorCodes {
  public static get INTERNAL_SERVER_ERROR(): string {
    return 'INTERNAL_SERVER_ERROR';
  }

  public static get INVALID_INPUT_PARAMS(): string {
    return 'INVALID_INPUT_PARAMS';
  }

  public static get INVALID_AUTH_PARAMS(): string {
    return 'INVALID_AUTH_PARAMS';
  }

  public static get INVALID_AUTH_PARAMS_PASSWORD_INCORECT(): string {
    return 'INVALID_AUTH_PARAMS_PASSWORD_INCORECT';
  }

  public static get UNAUTHORIZED(): string {
    return 'UNAUTHORIZED';
  }

  public static get RECORD_NOT_FOUND(): string {
    return 'RECORD_NOT_FOUND';
  }

  public static get CACHING_FAILED(): string {
    return 'CACHING_FAILED';
  }

  public static get TRANSACTION_FAILED(): string {
    return 'TRANSACTION_FAILED';
  }

  public static get AXIOS_REQUEST_FAILED(): string {
    return 'AXIOS_REQUEST_FAILED';
  }

  public static get DATASOURCE_REQUEST_FAILED(): string {
    return 'DATASOURCE_REQUEST_FAILED';
  }

  public static get IOT_CONNECTORS_PARSING_FAILED(): string {
    return 'IOT_CONNECTORS_PARSING_FAILED';
  }

  public static get DB_CONNECTION_ERROR(): string {
    return 'DB_CONNECTION_ERROR';
  }

  public static get IOT_CONNECTION_FAILED(): string {
    return 'IOT_CONNECTION_FAILED';
  }
}
