import { TransactionConfigBaseModel } from '../../module.transaction/models';

export interface IModuleSchemaParsedTemplate {
  _id: string;
  moduleClassName: string;
  moduleConfigClassName: string;
  friendlyName: string;
  configDefaults: TransactionConfigBaseModel;
}
