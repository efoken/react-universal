import { cloneDeep } from './cloneDeep';
import type { AnyObject } from './is';
import { isObject } from './is';

export interface MergeDeepOptions {
  clone?: boolean;
}

export function mergeDeep<T extends AnyObject>(
  target: T,
  source: unknown,
  { clone = true }: MergeDeepOptions = {},
) {
  const output: AnyObject = clone ? { ...target } : target;

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (key === '__proto__') {
        continue;
      }
      if (isObject(source[key]) && key in target && isObject(target[key])) {
        output[key] = mergeDeep(target[key], source[key], { clone });
      } else if (clone) {
        output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    }
  }

  return output as T;
}
