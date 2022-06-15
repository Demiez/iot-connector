import 'reflect-metadata';

import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import errorHandlingMiddleware from './core/middlewares/error-handling.middleware';
import router from './core/router';

require('dotenv').config();

class App {
  public app = express();

  constructor() {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    router(this.app);

    errorHandlingMiddleware(this.app);
  }
}

export default new App().app;
