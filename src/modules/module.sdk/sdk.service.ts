import * as JsonSchemaParser from '@apidevtools/json-schema-ref-parser';
import { IotSDK } from '@iot-configurator/sdk';
import {
  IModuleSchema,
  IModuleSchemaTemplate,
  IIoTModuleApi,
  ITransactionRequestBody,
  ITransactionResponse,
} from '@iot-configurator/sdk/interfaces';
import { cloneDeep, has, isEmpty } from 'lodash';
import { Service } from 'typedi';
import { config } from '../../config';
import { BadRequestError, ErrorCodes } from '../../core/errors';
import { logger, stringifyDataForLogging } from '../../core/utils';
import { IModuleSchemaParsedTemplate } from '../module.data-source/interfaces/data-source-schema.interfaces';
import {
  TransactionConfigBaseModel,
  TransactionResponseBaseModel,
} from '../module.transaction/models';
import {
  IOT_CONNECTION_ERROR_MESSAGE,
  TEST_TRANSACTION_SUBMITTED,
  TRANSACTION_FAILED_TO_COMPLETE,
  TRANSACTION_RESULT_RECEIVED,
  TRANSACTION_SUBMITTED,
} from './constants/message.constants';
import { SDKConfigDataModel } from './models/sdk-config.dm';

@Service()
export class SdkService {
  public sdk: IotSDK;

  constructor() {
    if (process.env.TEST_SKIP_SDK_INIT) return;

    this.sdk = new IotSDK(config as SDKConfigDataModel);
  }

  public async getEdgeModuleSchemas(): Promise<IModuleSchema[]> {
    const schemasResponse = await this.sdk.iotProcessing.getSchemas();

    const edgeModuleSchemas = schemasResponse.result;

    for (const schemaData of edgeModuleSchemas) {
      schemaData.schema = await JsonSchemaParser.dereference(
        JSON.parse(schemaData.schema as string)
      );
    }

    return edgeModuleSchemas;
  }

  public async getEdgeModuleTemplates(): Promise<
    IModuleSchemaParsedTemplate[]
  > {
    const edgeModuleTemplates: IModuleSchemaTemplate[] =
      await this.sdk.iotProcessing.getModuleSchemaTemplates();

    const parsedModuleTemplates: IModuleSchemaParsedTemplate[] = [];

    for (const templateData of edgeModuleTemplates) {
      const configDefaults = (await JsonSchemaParser.dereference(
        JSON.parse(templateData.configDefaults as string)
      )) as TransactionConfigBaseModel;

      parsedModuleTemplates.push(
        Object.assign(templateData, { configDefaults })
      );
    }

    return parsedModuleTemplates;
  }

  public async getEdgeModuleConfigById<T>(moduleId: string): Promise<T> {
    const modulesConfigs = (await this.getEdgeModulesConfigsByIds<T>([
      moduleId,
    ])) as T[];

    return modulesConfigs[0];
  }

  public async getEdgeModulesConfigsByIds<T>(
    moduleIds: string[]
  ): Promise<T[]> {
    const modulesDataResponse: IIoTModuleApi[] =
      await this.sdk.iotProcessing.getListConfig(moduleIds);

    const modulesConfigs: T[] = modulesDataResponse.map(
      (moduleData) => moduleData.config
    );

    return modulesConfigs;
  }

  public async submitTransaction(
    transactionRequestBody: ITransactionRequestBody
  ): Promise<TransactionResponseBaseModel> {
    const transaction = Object.assign({} as ITransactionRequestBody, {
      operations: this.clearTransactionHelperFields(
        cloneDeep(transactionRequestBody)
      ),
    });

    try {
      this.logTransactionData(TRANSACTION_SUBMITTED, transaction, false);

      const result = await this.sdk.iotTransactions.submitTransaction(
        transaction
      );

      if (!result) {
        this.logTransactionData(
          TRANSACTION_FAILED_TO_COMPLETE,
          transaction,
          true
        );

        throw new BadRequestError(ErrorCodes.TRANSACTION_FAILED, [
          TRANSACTION_FAILED_TO_COMPLETE,
        ]);
      }

      const isTransactionComplete =
        await this.sdk.iotTransactions.transactionComplete(
          result.transactionId
        );

      if (!isTransactionComplete) {
        this.logTransactionData(
          TRANSACTION_FAILED_TO_COMPLETE,
          transaction,
          true
        );

        throw new BadRequestError(ErrorCodes.TRANSACTION_FAILED, [
          TRANSACTION_FAILED_TO_COMPLETE,
        ]);
      }

      this.logTransactionData(TRANSACTION_RESULT_RECEIVED, result, false);

      return result as TransactionResponseBaseModel;
    } catch (error) {
      this.logTransactionData(error.message, transaction, true);
      throw new BadRequestError(
        ErrorCodes.TRANSACTION_FAILED,
        isEmpty(error.errorDetails) ? [error.message] : error.errorDetails
      );
    }
  }

  public async submitTestTransaction(
    testTransactionRequestBody: ITransactionRequestBody
  ): Promise<TransactionResponseBaseModel> {
    const testError = new BadRequestError(ErrorCodes.IOT_CONNECTION_FAILED, [
      IOT_CONNECTION_ERROR_MESSAGE,
    ]);

    const testTransaction = Object.assign({} as ITransactionRequestBody, {
      operations: this.clearTransactionHelperFields(
        cloneDeep(testTransactionRequestBody)
      ),
    });

    try {
      this.logTransactionData(
        TEST_TRANSACTION_SUBMITTED,
        testTransaction,
        false
      );

      const result = await this.sdk.iotTransactions.submitTransaction(
        testTransaction
      );

      if (!result) throw testError;

      const isTransactionComplete =
        await this.sdk.iotTransactions.transactionComplete(
          result.transactionId
        );

      if (!isTransactionComplete) throw testError;

      return result as TransactionResponseBaseModel;
    } catch (error) {
      throw testError;
    }
  }

  private clearTransactionHelperFields(transaction: ITransactionRequestBody) {
    const helperFieldsNames = [
      'newVariables',
      'operationType',
      'dataSourceType',
      'dataSourceId',
      'generatedSignalKey',
      'connectedSensorId',
      'gatewayId',
      'isDefault',
    ];

    return transaction.operations.map((operation) => {
      helperFieldsNames.forEach((fieldName) => {
        if (has(operation, fieldName)) {
          delete operation[fieldName];
        }
      });

      return operation;
    });
  }

  private logTransactionData(
    message: string,
    data: ITransactionResponse | ITransactionRequestBody,
    isError: boolean
  ) {
    if (isError) {
      return logger.error(message + ': \n' + stringifyDataForLogging(data));
    }

    logger.info(message + ': \n' + stringifyDataForLogging(data));
  }
}
