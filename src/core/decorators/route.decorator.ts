import { HttpMethodsEnum } from '../enums/http-methods.enum';
import { MetadataKeysEnum } from '../enums/metadata-keys.enum';
import { IRouteDefinition } from '../interfaces/route.interfaces';

const httpMethodDecoratorFactory = (requestMethod: HttpMethodsEnum) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey: string) => {
      const controllerClass = target.constructor;

      if (!Reflect.hasMetadata(MetadataKeysEnum.ROUTES, controllerClass)) {
        Reflect.defineMetadata(MetadataKeysEnum.ROUTES, [], controllerClass);
      }

      const routes = Reflect.getMetadata(
        MetadataKeysEnum.ROUTES,
        controllerClass
      ) as IRouteDefinition[];

      routes.push({
        requestMethod,
        path,
        methodName: propertyKey,
      });

      Reflect.defineMetadata(
        MetadataKeysEnum.ROUTES,
        routes,
        target.constructor
      );
    };
  };
};

export const Get = httpMethodDecoratorFactory(HttpMethodsEnum.GET);
export const Post = httpMethodDecoratorFactory(HttpMethodsEnum.POST);
export const Put = httpMethodDecoratorFactory(HttpMethodsEnum.PUT);
export const Patch = httpMethodDecoratorFactory(HttpMethodsEnum.PATCH);
export const Options = httpMethodDecoratorFactory(HttpMethodsEnum.OPTIONS);
export const Delete = httpMethodDecoratorFactory(HttpMethodsEnum.DELETE);
