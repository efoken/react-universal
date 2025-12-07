import type { GestureResponderEvent as RNGestureResponderEvent } from 'react-native';
import type { ResponderEvent } from './hooks/useResponderEvents';

export function normalizeResponderEvent<T extends (event: ResponderEvent) => any>(fn?: T) {
  return (event: RNGestureResponderEvent) =>
    fn?.({
      bubbles: event.bubbles ?? false,
      cancelable: event.cancelable ?? false,
      currentTarget: event.currentTarget,
      defaultPrevented: event.defaultPrevented ?? false,
      dispatchConfig: event.dispatchConfig,
      eventPhase: event.eventPhase ?? 2,
      isDefaultPrevented: event.isDefaultPrevented.bind(event),
      isPropagationStopped: event.isPropagationStopped.bind(event),
      isTrusted: event.isTrusted ?? true,
      nativeEvent: event.nativeEvent,
      persist: event.persist.bind(event),
      preventDefault: event.preventDefault.bind(event),
      stopPropagation: event.stopPropagation.bind(event),
      target: event.target,
      timeStamp: event.timeStamp,
      touchHistory: {
        ...event.touchHistory,
        touchBank: [...event.touchHistory.touchBank],
      },
      type: event.type!,
    });
}
