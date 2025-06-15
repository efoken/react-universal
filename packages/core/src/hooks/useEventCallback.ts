import type { AnyFunction } from '@react-universal/utils';
import { useInsertionEffect } from 'react';
import { useLazyRef } from './useLazyRef';

type Stable<T extends AnyFunction> = {
  /**
   * The next value for callback
   */
  next?: T;
  /**
   * The function to be called by trampoline. This must fail during the initial
   * render phase.
   */
  callback?: T;
  trampoline: T;
  effect: () => void;
};

function assertNotCalled() {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('React Universal: Cannot call an event handler while rendering.');
  }
}

function createStableCallback() {
  const stable: Stable<any> = {
    callback: assertNotCalled,
    trampoline: (...args: []) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    },
  };
  return stable;
}

export function useEventCallback<T extends AnyFunction>(callback?: T): T {
  const stable = useLazyRef(createStableCallback).current;
  stable.next = callback;
  useInsertionEffect(stable.effect);
  return stable.trampoline;
}
