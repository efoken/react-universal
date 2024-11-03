import type { AnyObject } from '@react-universal/utils';
import { useMemo } from 'react';

export function useOwnerState<T extends AnyObject>(ownerState: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ownerState, Object.values(ownerState));
}
