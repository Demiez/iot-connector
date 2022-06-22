import { Application, Request, Response } from 'express';
import Container from 'typedi';
import { APP_ROOT, APP_ROOT_MESSAGE } from '../constants';
import { BaseStatus } from '../enums/base-statuses.enum';
import { MetadataKeysEnum } from '../enums/metadata-keys.enum';
import { IRouteDefinition } from '../interfaces/route.interfaces';
import { StandardResponseViewModel } from '../view-models';
import { wrapRouteAction } from './route-wrapper';

export default (app: Application): void => {
  app.get(APP_ROOT, (req: Request, res: Response) => {
    res
      .status(200)
      .send(new StandardResponseViewModel({}, APP_ROOT_MESSAGE, BaseStatus.OK));
  });

  [].forEach((controller: unknown) => {
    const controllerInstance = Container.get(controller);

    const prefix = Reflect.getMetadata(MetadataKeysEnum.PREFIX, controller);

    const routes: IRouteDefinition[] = Reflect.getMetadata(
      MetadataKeysEnum.ROUTES,
      controller
    );

    for (const route of routes) {
      app[route.requestMethod](
        prefix + route.path,
        // Required for middleware
        // eslint-disable-next-line
        wrapRouteAction(async (req, res, next) => {
          await controllerInstance[route.methodName](req, res);
        })
      );
    }
  });
};
