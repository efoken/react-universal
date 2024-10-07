type PickKeys<T extends Record<string, any>, U extends Record<string, boolean>> = {
  [K in keyof U]: U[K] extends true ? (K extends keyof T ? K : never) : never;
}[keyof U];

export function pick<T extends Record<string, any>, U extends Record<string, boolean>>(
  obj: T,
  list: U,
) {
  const nextObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && list[key] === true) {
      nextObj[key] = obj[key];
    }
  }
  return nextObj as Pick<T, PickKeys<T, U>>;
}
