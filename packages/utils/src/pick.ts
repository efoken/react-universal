import type { AnyObject } from './is';

type PickKeys<T extends AnyObject, U extends AnyObject<boolean>> = {
  [K in keyof U]: U[K] extends true ? (K extends keyof T ? K : never) : never;
}[keyof U];

export function pick<T extends AnyObject, U extends AnyObject<boolean>>(obj: T, list: U) {
  const nextObj: AnyObject<any> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key) && list[key] === true) {
      nextObj[key] = obj[key];
    }
  }
  return nextObj as Pick<T, PickKeys<T, U>>;
}
