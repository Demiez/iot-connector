import * as packageJson from '../../../package.json';

export const APP_ROOT = `/api/v${packageJson.version.split('.')[0]}`;
export const APP_ROOT_MESSAGE = 'IoT Connector root endpoint';
export const TEN_MINUTES_TIMEOUT = 600000;
export const SIMPLE_DATE_FORMAT = 'DD-MM-YYYY';
