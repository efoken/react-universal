import { noop } from './noop';

export function composeEventHandlers<T extends { defaultPrevented: boolean }>(
  ...fns: (((event: T) => any) | undefined)[]
): (event: T) => any {
  return fns.reduce<(event: T) => any>((acc, fn) => {
    if (fn == null) {
      return acc;
    }
    return (event) => {
      acc(event);
      if (!event.defaultPrevented) {
        fn(event);
      }
    };
  }, noop);
}
