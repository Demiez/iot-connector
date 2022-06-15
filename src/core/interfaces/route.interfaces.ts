import { HttpMethodsEnum } from '../enums/http-methods.enum';

export interface IRouteDefinition {
  path: string;
  requestMethod: HttpMethodsEnum;
  methodName: string;
}
