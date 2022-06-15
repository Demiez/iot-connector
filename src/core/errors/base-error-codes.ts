export class BaseErrorCodes {
  public static get INTERNAL_SERVER_ERROR(): string {
    return 'INTERNAL_SERVER_ERROR';
  }

  public static get INVALID_INPUT_PARAMS(): string {
    return 'INVALID_INPUT_PARAMS';
  }

  public static get UNAUTHORIZED(): string {
    return 'UNAUTHORIZED';
  }

  public static get RECORD_NOT_FOUND(): string {
    return 'RECORD_NOT_FOUND';
  }

  public static get USER_NOT_FOUND(): string {
    return 'USER_NOT_FOUND';
  }
}

export class BaseErrorSubCodes {
  public static get INVALID_INPUT_PARAMS_IS_REQUIRED(): string {
    return 'INVALID_INPUT_PARAMS_IS_REQUIRED';
  }

  public static get INVALID_INPUT_PARAMS_IS_PRIMARY(): string {
    return 'INVALID_INPUT_PARAMS_IS_PRIMARY';
  }

  public static get INVALID_INPUT_PARAMS_IS_BAD_VALUE(): string {
    return 'INVALID_INPUT_PARAMS_IS_BAD_VALUE';
  }

  public static get UNAUTHORIZED_PERMISSIONS_DENIED(): string {
    return 'UNAUTHORIZED_PERMISSIONS_DENIED';
  }

  public static get INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE(): string {
    return 'INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE';
  }

  public static get INVALID_INPUT_PARAMS_IS_DUPLICATE_RECORD(): string {
    return 'INVALID_INPUT_PARAMS_IS_DUPLICATE_RECORD';
  }
}
