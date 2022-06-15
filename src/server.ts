import app from './app';
import { logger } from './core/utils';

const port: string | number = process.env.PORT;
const env: string = process.env.NODE_ENV;

app.listen(port, () =>
  logger.info(`Server running in ${env} mode on port: ${port}`)
);
