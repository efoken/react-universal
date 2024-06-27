import type { LayoutChangeEvent as RNLayoutChangeEvent } from 'react-native';
import type { LayoutEvent } from './hooks/useElementLayout';

export function normalizeLayoutEvent(onLayout?: (event: LayoutEvent) => void) {
  return (event: RNLayoutChangeEvent) =>
    onLayout?.({
      nativeEvent: {
        layout: {
          height: event.nativeEvent.layout.height,
          left: event.nativeEvent.layout.x,
          top: event.nativeEvent.layout.y,
          width: event.nativeEvent.layout.width,
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
        },
        target: event.target,
      },
      timeStamp: event.timeStamp,
    });
}
