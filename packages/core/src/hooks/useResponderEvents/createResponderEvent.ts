import { getBoundingClientRect, isFunction, noop } from '@react-universal/utils';
import type {
  NativeTouchEvent,
  GestureResponderEvent as RNGestureResponderEvent,
} from 'react-native';
import type { ResponderTouchHistoryStore, TouchHistory } from './ResponderTouchHistoryStore';

export interface ResponderEvent extends RNGestureResponderEvent {
  dispatchConfig: {
    registrationName?: string;
  };
  touchHistory: TouchHistory;
}

/**
 * Safari produces very large identifiers that would cause the `touchBank` array
 * length to be so large as to crash the browser, if not normalized like this.
 * In the future the `touchBank` should use an object/map instead.
 */
function normalizeIdentifier(identifier: any) {
  return identifier > 20 ? identifier % 20 : identifier;
}

export function createResponderEvent(
  domEvent: any,
  responderTouchHistoryStore: ResponderTouchHistoryStore,
): ResponderEvent {
  let rect: DOMRect | undefined;
  let propagationWasStopped = false;
  let changedTouches: NativeTouchEvent[];
  let touches: NativeTouchEvent[];

  const clientX = domEvent.changedTouches?.[0].clientX ?? domEvent.clientX;
  const clientY = domEvent.changedTouches?.[0].clientY ?? domEvent.clientY;
  const force = domEvent.changedTouches?.[0].force ?? 0;
  const identifier = normalizeIdentifier(domEvent.changedTouches?.[0].identifier ?? 0);
  const metaKey = domEvent.metaKey === true;
  const pageX = domEvent.changedTouches?.[0].pageX ?? domEvent.pageX;
  const pageY = domEvent.changedTouches?.[0].pageY ?? domEvent.pageY;
  const shiftKey = domEvent.shiftKey === true;
  const timestamp = domEvent.timeStamp;

  const normalizeTouches = (touches: TouchList) =>
    Array.from(touches).map<NativeTouchEvent>((touch) => ({
      changedTouches: [],
      force: touch.force,
      identifier: normalizeIdentifier(touch.identifier),
      get locationX() {
        return locationX(touch.clientX);
      },
      get locationY() {
        return locationY(touch.clientY);
      },
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target as any,
      timestamp,
      touches: [],
    }));

  if (domEvent.changedTouches != null) {
    changedTouches = normalizeTouches(domEvent.changedTouches);
    touches = normalizeTouches(domEvent.touches);
  } else {
    const emulatedTouches: NativeTouchEvent[] = [
      {
        changedTouches: [],
        force,
        identifier,
        get locationX() {
          return locationX(clientX);
        },
        get locationY() {
          return locationY(clientY);
        },
        pageX,
        pageY,
        target: domEvent.target as any,
        timestamp,
        touches: [],
      },
    ];
    changedTouches = emulatedTouches;
    touches = domEvent.type === 'mouseup' || domEvent.type === 'dragstart' ? [] : emulatedTouches;
  }

  const responderEvent: ResponderEvent = {
    bubbles: true,
    cancelable: true,
    // @ts-expect-error: `currentTarget` is set before dispatch
    currentTarget: null,
    defaultPrevented: domEvent.defaultPrevented,
    dispatchConfig: {},
    eventPhase: domEvent.eventPhase,
    isDefaultPrevented() {
      return domEvent.defaultPrevented;
    },
    isPropagationStopped() {
      return propagationWasStopped;
    },
    isTrusted: domEvent.isTrusted,
    nativeEvent: {
      // @ts-expect-error: we explicitly save some extras from the domEvent here
      altKey: false,
      changedTouches,
      ctrlKey: false,
      force,
      identifier,
      get locationX() {
        return locationX(clientX);
      },
      get locationY() {
        return locationY(clientY);
      },
      metaKey,
      pageX,
      pageY,
      shiftKey,
      target: domEvent.target as any,
      timestamp,
      touches,
    },
    persist: noop,
    preventDefault: isFunction(domEvent.preventDefault)
      ? domEvent.preventDefault.bind(domEvent)
      : noop,
    stopPropagation() {
      propagationWasStopped = true;
    },
    target: domEvent.target as any,
    timeStamp: timestamp,
    touchHistory: responderTouchHistoryStore.touchHistory,
    type: domEvent.type,
  };

  // Using getters and functions serves two purposes:
  // 1) The value of `currentTarget` is not initially available.
  // 2) Measuring the clientRect may cause layout jank and should only be done on-demand.
  const locationX = (x: number) => {
    rect ??= getBoundingClientRect(responderEvent.currentTarget as any)!;
    return x - rect.left;
  };
  const locationY = (y: number) => {
    rect ??= getBoundingClientRect(responderEvent.currentTarget as any)!;
    return y - rect.top;
  };

  return responderEvent;
}
