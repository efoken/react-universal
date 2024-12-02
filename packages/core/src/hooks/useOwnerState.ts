import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';

export function useOwnerState<T extends AnyObject>(ownerState: T) {
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  return useMemo(() => ownerState, Object.values(ownerState));
}
