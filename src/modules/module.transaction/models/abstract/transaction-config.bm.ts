import { ModuleTypeEnum } from '../../enums';

export abstract class TransactionConfigBaseModel {
  public moduleType: ModuleTypeEnum;
  public moduleClass: string;
  public configClass: string;
  public startAfterSystemLaunch: boolean;
  public sourceName: string;
  public usePrimary: boolean;

  public moduleId?: string;
  public moduleName?: string;
  public groupId?: string;
  public startPosition?: number;
  public stopPosition?: number;
  public description?: string;
  public version?: number;
  public databusKey?: string;
  public mqttServerAddress?: string;
  public useMqttEnv?: boolean;
}
