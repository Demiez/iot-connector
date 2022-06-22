import { IoTModuleStatesEnum, IoTTransactionModesEnum } from '../enums';

export interface IIoTModuleApi {
  id: string;
  name: string;
  //eslint-disable-next-line
  config: any;
  state: IoTModuleStatesEnum;
  moduleClass: string;
  groupId: string;
  gatewayId: string;
}

export interface ICommandKeys {
  moduleId?: string;
  moduleClass?: string;
  groupId?: string;
}

export interface ITransactionOperation {
  mode: IoTTransactionModesEnum | string;
  operationId?: string;
  commandKeys?: ICommandKeys;
  //eslint-disable-next-line
  config?: any;
}

export interface ITransactionRequestBody {
  transactionId: string;
  gatewayId: string;
  operations: ITransactionOperation[];
}

export interface ITransactionResponse {
  transactionId: string;
  gatewayId: string;
  operations: ITransactionOperation[];
}
