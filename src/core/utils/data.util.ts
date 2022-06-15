import {
  difference,
  isEmpty,
  isEqual,
  isObject,
  transform,
  xorWith,
} from 'lodash';

export const convertVariableToString = (
  variableObject: Record<string, unknown>
): string => {
  return Object.keys(variableObject)[0];
};

export const getDifference = (
  object: Record<string, unknown>,
  base: Record<string, unknown>
): Record<string, unknown> => {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        // required for generic object comparison
        isObject(value) && isObject(base[key])
          ? // eslint-disable-next-line
            difference(value as any, base[key] as any)
          : value;
    }
  });
};

export const stringifyDataForLogging = (
  // eslint-disable-next-line
  data: any
): string => JSON.stringify(data, null, 4);

// eslint-disable-next-line
export const checkIsArrayEqual = (x: any, y: any): boolean =>
  isEmpty(xorWith(x, y, isEqual));
