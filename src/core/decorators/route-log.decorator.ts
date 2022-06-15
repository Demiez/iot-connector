import { Request } from 'express';

// For debug purposes
export function DetailedRouteLog(): MethodDecorator {
  return function (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const request = args[0] as Request;

      const { url, method, body, headers } = request;

      process.stdout.write(
        '[DETAILED-LOG]\n' +
          JSON.stringify(
            {
              url,
              method,
              body,
              headers,
            },
            null,
            4
          ) +
          '\n'
      );

      return original.apply(this, args);
    };
  };
}
