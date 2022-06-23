import { ITransactionRequestBody, ITransactionResponse } from '../interfaces';
import { v4 } from 'uuid';
import { isEmpty } from 'lodash';

export class IoTTransactionService {
  public async submitTransaction(
    transactionBody: ITransactionRequestBody
  ): Promise<ITransactionResponse> {
    return Promise.resolve({
      transactionId: transactionBody.transactionId || v4(),
      gatewayId: transactionBody.gatewayId || v4(),
      operations: !isEmpty(transactionBody.operations)
        ? transactionBody.operations
        : [],
    } as ITransactionResponse);
  }

  public async transactionComplete(transactionId: string): Promise<boolean> {
    return Promise.resolve(!!transactionId);
  }
}
