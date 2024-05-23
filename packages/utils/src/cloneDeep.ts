export function cloneDeep<T>(source: T): T | Record<keyof any, unknown> {
  return structuredClone(source);
}
