import { useEffect, useRef } from 'react';
import type { EventSubscription } from 'react-native';
import { BackHandler } from 'react-native';

export function useBackHandler(handler: () => boolean) {
  const handlerRef = useRef<EventSubscription>(undefined);
  useEffect(() => {
    handlerRef.current = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      handlerRef.current?.remove();
    };
  }, [handler]);
}
