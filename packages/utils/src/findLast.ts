export function findLast<T, S extends T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => value is S,
): S | undefined;

export function findLast<T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): T | undefined;

export function findLast<T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): T | undefined {
  return arr.reduce<T | undefined>(
    (prevValue, value, index) => (predicate(value, index, arr) ? value : prevValue),
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );
}
