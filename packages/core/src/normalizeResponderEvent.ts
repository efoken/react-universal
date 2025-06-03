import type { GestureResponderEvent as RNGestureResponderEvent } from 'react-native';
import type { ResponderEvent } from './hooks/useResponderEvents';

export function normalizeResponderEvent<T extends (event: ResponderEvent) => any>(fn?: T) {
  return (event: RNGestureResponderEvent) =>
    fn?.({
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      currentTarget: event.currentTarget,
      defaultPrevented: event.defaultPrevented,
      dispatchConfig: {},
      eventPhase: event.eventPhase,
      isDefaultPrevented: event.isDefaultPrevented.bind(event),
      isPropagationStopped: event.isPropagationStopped.bind(event),
      isTrusted: event.isTrusted,
      nativeEvent: event.nativeEvent,
      persist: event.persist.bind(event),
      preventDefault: event.preventDefault.bind(event),
      stopPropagation: event.stopPropagation.bind(event),
      target: event.target,
      timeStamp: event.timeStamp,
      // @ts-expect-error: `touchHistory` is missing in React Native types
      touchHistory: event.touchHistory ?? {
        indexOfSingleActiveTouch: 0,
        mostRecentTimeStamp: event.timeStamp,
        numberActiveTouches: 1,
        touchBank: [],
      },
      type: event.type,
    });
}
