type PickKeys<T> = {
  [K in keyof T]: T[K] extends true ? (K extends string ? K : never) : never;
}[keyof T];

export function pick<
  T extends Record<string, any>,
  U extends Record<string, boolean>,
>(obj: T, list: U) {
  const nextObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && list[key] === true) {
      nextObj[key] = obj[key];
    }
  }
  return nextObj as Pick<T, PickKeys<U>>;
}
