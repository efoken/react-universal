import { runIfFunction } from '@react-universal/utils';
import { useRef } from 'react';

export function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<T | null>(null);
  if (ref.current == null) {
    ref.current = runIfFunction(initialValue);
  }
  return ref.current;
}
