import { isClient } from '@tamagui/constants';
import { useInsertionEffect } from 'react';

const syncFallback = <T extends () => any>(create: T): ReturnType<T> =>
  create();

export const useInsertionEffectAlwaysWithSyncFallback:
  | typeof syncFallback
  | (() => void) = isClient ? (useInsertionEffect as () => void) : syncFallback;
