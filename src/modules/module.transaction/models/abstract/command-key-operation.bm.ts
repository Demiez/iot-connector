import { OperationModeEnum } from '../../enums';
import { ICommandKeys } from '../../interfaces/operation-data.interfaces';

export abstract class CommandKeyOperationBaseModel {
  public mode: OperationModeEnum;
  public commandKeys?: ICommandKeys;
  public operationId?: string;

  constructor(mode: OperationModeEnum, commandKeys?: ICommandKeys) {
    this.mode = mode;
    this.commandKeys = commandKeys;
  }
}
