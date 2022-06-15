import * as moment from 'moment';
import { createLogger, format, transports } from 'winston';
import { SIMPLE_DATE_FORMAT } from '../constants';
require('dotenv').config();

const date = moment().format(SIMPLE_DATE_FORMAT);
const print = format.printf((info) => {
  const log = `${info.level}: ${[info.timestamp]}: ${info.message}`;

  return info.stack ? `${log}\n${info.stack}` : log;
});

export const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: `${SIMPLE_DATE_FORMAT} HH:mm:ss` }),
    format.align(),
    format.errors({ stack: true }),
    print
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          all: true,
        })
      ),
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.File({ filename: `./logs/${date}-log.log` }));
}
