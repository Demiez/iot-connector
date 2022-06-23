import { ITransactionResponse } from '@demiez/iot-sdk';
import { CommandKeyOperationBaseModel } from './command-key-operation.bm';
import { OperationBaseModel } from './operation.bm';

export abstract class TransactionResponseBaseModel
  implements ITransactionResponse
{
  public transactionId: string;
  public gatewayId: string;
  public operations: (OperationBaseModel | CommandKeyOperationBaseModel)[];
}
