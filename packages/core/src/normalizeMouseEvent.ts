import type {
  GestureResponderEvent as RNGestureResponderEvent,
  MouseEvent as RNMouseEvent,
  PointerEvent as RNPointerEvent,
} from 'react-native';

export function normalizeMouseEvent(fn?: (event: React.MouseEvent<HTMLElement>) => void) {
  return (event: RNGestureResponderEvent | RNMouseEvent | RNPointerEvent) => {
    const clientX =
      'clientX' in event.nativeEvent ? event.nativeEvent.clientX : event.nativeEvent.locationX;
    const clientY =
      'clientY' in event.nativeEvent ? event.nativeEvent.clientY : event.nativeEvent.locationY;
    const metaKey = 'metaKey' in event.nativeEvent && event.nativeEvent.metaKey === true;

    fn?.({
      altKey: (event as RNPointerEvent).nativeEvent.altKey ?? false,
      bubbles: event.bubbles ?? false,
      button: (event as RNPointerEvent).nativeEvent.button ?? 0,
      buttons: (event as RNPointerEvent).nativeEvent.buttons ?? 0,
      cancelable: event.cancelable ?? false,
      clientX,
      clientY,
      ctrlKey: (event as RNPointerEvent).nativeEvent.ctrlKey ?? false,
      currentTarget: event.currentTarget as any,
      defaultPrevented: event.defaultPrevented ?? false,
      detail: (event as RNPointerEvent).nativeEvent.detail ?? 0,
      eventPhase: event.eventPhase ?? 2,
      getModifierState: () => false,
      isDefaultPrevented: event.isDefaultPrevented.bind(event),
      isPropagationStopped: event.isPropagationStopped.bind(event),
      isTrusted: event.isTrusted ?? true,
      metaKey,
      movementX: 0,
      movementY: 0,
      nativeEvent: event.nativeEvent as any,
      pageX: event.nativeEvent.pageX,
      pageY: event.nativeEvent.pageY,
      persist: event.persist.bind(event),
      preventDefault: event.preventDefault.bind(event),
      relatedTarget: null,
      screenX: (event as RNPointerEvent).nativeEvent.screenX,
      screenY: (event as RNPointerEvent).nativeEvent.screenY,
      shiftKey: false,
      stopPropagation: event.stopPropagation.bind(event),
      target: event.target as any,
      timeStamp: event.timeStamp,
      type: event.type!,
      view: null as any,
    });
  };
}
