export interface IModuleSchema {
  _id: string;
  friendlyName: string;
  moduleClassName: string;
  moduleConfigClassName: string;
  schema: unknown;
}

export interface IModuleSchemaTemplate {
  _id: string;
  friendlyName: string;
  moduleClassName: string;
  moduleConfigClassName: string;
  configDefaults: string;
}

export interface IModuleStatus {
  _id: string;
  gatewayId: string;
  status: string;
  moduleId: string;
  moduleClass: string;
  moduleName: string;
}
