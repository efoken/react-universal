export { useResponderEvents } from '@tamagui/react-native-use-responder-events';

export interface ResponderEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: any;
  defaultPrevented: boolean | null;
  dispatchConfig: {
    registrationName?: string;
    phasedRegistrationNames?: {
      bubbled: string;
      captured: string;
    };
  };
  eventPhase: number | null;
  isDefaultPrevented: () => boolean;
  isPropagationStopped: () => boolean;
  isTrusted: boolean | null;
  nativeEvent: TouchEvent;
  persist: () => void;
  preventDefault: () => void;
  stopPropagation: () => void;
  target: any;
  timeStamp: number;
  touchHistory: {
    indexOfSingleActiveTouch: number;
    mostRecentTimeStamp: number;
    numberActiveTouches: number;
    touchBank: {
      currentPageX: number;
      currentPageY: number;
      currentTimeStamp: number;
      previousPageX: number;
      previousPageY: number;
      previousTimeStamp: number;
      startPageX: number;
      startPageY: number;
      startTimeStamp: number;
      touchActive: boolean;
    }[];
  };
}

export interface ResponderConfig {
  // Direct responder events dispatched directly to responder. Do not bubble.
  onResponderEnd?: ((e: ResponderEvent) => void) | null;
  onResponderGrant?: ((e: ResponderEvent) => void | boolean) | null;
  onResponderMove?: ((e: ResponderEvent) => void) | null;
  onResponderReject?: ((e: ResponderEvent) => void) | null;
  onResponderRelease?: ((e: ResponderEvent) => void) | null;
  onResponderStart?: ((e: ResponderEvent) => void) | null;
  onResponderTerminate?: ((e: ResponderEvent) => void) | null;
  onResponderTerminationRequest?: ((e: ResponderEvent) => boolean) | null;
  // On pointer down, should this element become the responder?
  onStartShouldSetResponder?: ((e: ResponderEvent) => boolean) | null;
  onStartShouldSetResponderCapture?: ((e: ResponderEvent) => boolean) | null;
  // On pointer move, should this element become the responder?
  onMoveShouldSetResponder?: ((e: ResponderEvent) => boolean) | null;
  onMoveShouldSetResponderCapture?: ((e: ResponderEvent) => boolean) | null;
  // On scroll, should this element become the responder? Do no bubble
  onScrollShouldSetResponder?: ((e: ResponderEvent) => boolean) | null;
  onScrollShouldSetResponderCapture?: ((e: ResponderEvent) => boolean) | null;
  // On text selection change, should this element become the responder?
  onSelectionChangeShouldSetResponder?: ((e: ResponderEvent) => boolean) | null;
  onSelectionChangeShouldSetResponderCapture?: ((e: ResponderEvent) => boolean) | null;
}
