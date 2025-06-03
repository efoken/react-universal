import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';

export function useOwnerState<T extends AnyObject>(ownerState: T) {
  return useMemo(() => ownerState, [ownerState]);
}
