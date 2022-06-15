import { MetadataKeysEnum } from '../enums/metadata-keys.enum';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: unknown) => {
    Reflect.defineMetadata(MetadataKeysEnum.PREFIX, prefix, target);

    if (!Reflect.hasMetadata(MetadataKeysEnum.ROUTES, target)) {
      Reflect.defineMetadata(MetadataKeysEnum.ROUTES, [], target);
    }
  };
};
