import {
  IIoTModuleApi,
  IModuleSchema,
  IModuleSchemaTemplate,
  IResultStatusObject,
} from '../interfaces';

export class IoTProcessingService {
  /**
   * IoTProcessingService is supposed to be integrated with IoT Orchestrator
   * Mock data will be returned for demo implementation
   */

  /**
   * Gets available IoT modules schemas
   */
  public async getSchemas(): Promise<IResultStatusObject<IModuleSchema[]>> {
    return Promise.resolve({
      result: [] as IModuleSchema[],
    } as IResultStatusObject<IModuleSchema[]>);
  }

  /**
   * Gets available IoT modules schema templates
   */
  public async getModuleSchemaTemplates(): Promise<IModuleSchemaTemplate[]> {
    return Promise.resolve([] as IModuleSchemaTemplate[]);
  }

  /**
   * Gets list of available IoT modules configs
   */
  public async getListConfig(moduleIds: string[]): Promise<IIoTModuleApi[]> {
    const iotModulesConfigs = moduleIds.map(
      (moduleId) => ({ id: moduleId } as IIoTModuleApi)
    );

    return Promise.resolve(iotModulesConfigs);
  }
}
