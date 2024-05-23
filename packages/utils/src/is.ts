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
