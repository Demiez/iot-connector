import { IServiceConfig } from '../interfaces';

export class SDKConfig {
  public serviceConfig: IServiceConfig;
  public mongoConnection: string;
  public mqttConnection: string;
  public rabbitConnection: string;
  public iotHost: string;
  public iotPort: string;
  public iotApiHost: string;
  public solutionName: string;
}
