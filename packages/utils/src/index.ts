export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isFunction<
  T extends (...args: any[]) => any = (...args: any[]) => any,
>(value: any): value is T {
  return typeof value === 'function';
}

export function isObject(value: any): value is Record<string, any> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function cloneDeep<T>(source: T): T | Record<keyof any, unknown> {
  return structuredClone(source);
}

export interface MergeDeepOptions {
  clone?: boolean;
}

export function mergeDeep<T extends Record<string, any>>(
  target: T,
  source: unknown,
  { clone = true }: MergeDeepOptions = {},
) {
  const output: Record<string, any> = clone ? { ...target } : target;

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (key === '__proto__') {
        continue;
      }
      if (isObject(source[key]) && key in target && isObject(target[key])) {
        output[key] = mergeDeep(target[key], source[key], { clone });
      } else if (clone) {
        output[key] = isObject(source[key])
          ? cloneDeep(source[key])
          : source[key];
      } else {
        output[key] = source[key];
      }
    }
  }

  return output as T;
}

export function get<T extends Record<string, any>>(
  obj: T,
  path: string | number | undefined,
  fallback?: any,
): unknown {
  if (!path || (!isString(path) && !isNumber(path))) {
    return undefined;
  }
  return (
    `${path}`.split('.').reduce((acc, item) => {
      if (acc && acc[item] != null) {
        return acc[item];
      }
      return undefined;
    }, obj) ?? fallback
  );
}

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
