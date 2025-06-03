import { isFunction } from './is';

export function runIfFunction<T, U extends any[]>(
  valueOrFn: T | ((...fnArgs: U) => T),
  ...args: U
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
