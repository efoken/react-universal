import { useMemo } from 'react';

export function useOwnerState<T extends Record<string, any>>(ownerState: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ownerState, Object.values(ownerState));
}
