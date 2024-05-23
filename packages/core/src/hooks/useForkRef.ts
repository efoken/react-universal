import { isFunction } from '@universal-ui/utils';
import { useMemo } from 'react';

export function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null,
): void {
  if (isFunction(ref)) {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}

export function useForkRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> | null {
  /**
   * This will create a new function if the refs passed to this hook change and
   * are all defined. This means React will call the old forkRef with `null` and
   * the new forkRef with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance) => {
      for (const ref of refs) {
        setRef(ref, instance);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
