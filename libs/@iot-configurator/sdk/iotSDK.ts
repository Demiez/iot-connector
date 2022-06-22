import { SDKConfig } from './configurations';
import { IoTProcessingService, IoTTransactionService } from './services';

export class IotSDK {
  private readonly _currentConfig: SDKConfig;

  private _iotProcessing: IoTProcessingService;
  private _iotTransactions: IoTTransactionService;

  constructor(sdkConfig: SDKConfig) {
    this._currentConfig = sdkConfig;
    /**
     * Config is used for futher processing, partially used in current implementation
     */
  }

  public get iotProcessing(): IoTProcessingService {
    if (!this.iotProcessing) {
      this._iotProcessing = new IoTProcessingService();
    }

    return this._iotProcessing;
  }

  public get iotTransactions(): IoTTransactionService {
    if (!this.iotTransactions) {
      this._iotTransactions = new IoTTransactionService();
    }

    return this._iotTransactions;
  }
}
