import { OperationModeEnum, OperationTypeEnum } from '../../enums';

// TODO: uncomment required fields after implementation
export abstract class OperationBaseModel {
  public mode: OperationModeEnum;
  public operationId: string;
  // Required any for base model
  // eslint-disable-next-line
  public config: any;

  public operationType: OperationTypeEnum;
  // public dataSourceType: DataSourceTypesEnum;
  public dataSourceId?: string;
  public generatedSignalKey?: string;
  // public newVariable?: IBaseVariable;
  // public newVariables?: IBaseVariable[] = [];
  public connectedSensorId?: string;
  public isDefault?: boolean;

  constructor(mode: OperationModeEnum) {
    this.mode = mode;
  }
}
