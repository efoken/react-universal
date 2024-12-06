import type { AnyObject } from '@react-universal/utils';

export interface ForProps<T> {
  /**
   * The render function to render each item in the array.
   */
  children: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  /**
   * The array to iterate overs.
   */
  each: T[] | readonly T[] | undefined;
  /**
   * The fallback content to render when the array is empty.
   */
  fallback?: React.ReactNode;
}

export const For = <T extends string | number | AnyObject | undefined>({
  each,
  fallback,
  children,
}: ForProps<T>): React.ReactNode =>
  each?.length === 0 ? fallback || null : each?.map(children as any);
