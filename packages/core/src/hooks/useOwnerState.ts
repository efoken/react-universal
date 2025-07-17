import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';

export function useOwnerState<T extends AnyObject>(ownerState: T) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: We use `JSON.stringify` for deep equality check
  return useMemo(() => ownerState, [JSON.stringify(ownerState)]);
}
