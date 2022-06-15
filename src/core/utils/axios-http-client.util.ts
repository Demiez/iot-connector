import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as https from 'https';

export type AnyArgumentsErroHandlerType = (...args: unknown[]) => void;
const isProduction = process.env.NODE_ENV === 'production';
const isTestSkip = process.env.TEST_SKIP_SDK_INIT;

export abstract class AxiosHttpClient {
  protected readonly instance: AxiosInstance;
  protected readonly httpsAgent: https.Agent;

  public constructor(baseURL: string) {
    this.httpsAgent =
      isProduction || isTestSkip
        ? new https.Agent({
            passphrase: undefined,
            rejectUnauthorized: false,
          })
        : new https.Agent({
            cert: fs.readFileSync(process.env.EDGE_TLS_CERT_FILE),
            key: fs.readFileSync(process.env.EDGE_TLS_KEY_FILE),
            passphrase: undefined,
            rejectUnauthorized: false,
          });

    this.instance = axios.create({
      baseURL,
      httpsAgent: this.httpsAgent,
    });
  }

  protected initializeResponseInterceptor(
    isResultData: boolean,
    errorHandler: AnyArgumentsErroHandlerType
  ): void {
    this.instance.interceptors.response.use(
      ({ data }: AxiosResponse) => (isResultData ? data.result : data),
      errorHandler
    );
  }

  protected async sendGetRequest<T>(url: string): Promise<T> {
    return await this.instance.get(url);
  }
}
