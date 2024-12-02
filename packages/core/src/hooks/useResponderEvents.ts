export { useResponderEvents } from '@tamagui/react-native-use-responder-events';

export interface ResponderEvent
  extends Omit<
    React.BaseSyntheticEvent<TouchEvent, any, any>,
    'defaultPrevented' | 'eventPhase' | 'isTrusted' | 'type'
  > {
  defaultPrevented: boolean | null;
  dispatchConfig: {
    registrationName?: string;
    phasedRegistrationNames?: {
      bubbled: string;
      captured: string;
    };
  };
  eventPhase: number | null;
  isTrusted: boolean | null;
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
  // On pointer move, should this element become the responder?
  onMoveShouldSetResponder?: (event: ResponderEvent) => boolean;
  onMoveShouldSetResponderCapture?: (event: ResponderEvent) => boolean;
  // Direct responder events dispatched directly to responder. Do not bubble.
  onResponderEnd?: (event: ResponderEvent) => void;
  // biome-ignore lint/suspicious/noConfusingVoidType:
  onResponderGrant?: (event: ResponderEvent) => void | boolean;
  onResponderMove?: (event: ResponderEvent) => void;
  onResponderReject?: (event: ResponderEvent) => void;
  onResponderRelease?: (event: ResponderEvent) => void;
  onResponderStart?: (event: ResponderEvent) => void;
  onResponderTerminate?: (event: ResponderEvent) => void;
  onResponderTerminationRequest?: (event: ResponderEvent) => boolean;
  // On scroll, should this element become the responder? Do no bubble
  onScrollShouldSetResponder?: (event: ResponderEvent) => boolean;
  onScrollShouldSetResponderCapture?: (event: ResponderEvent) => boolean;
  // On text selection change, should this element become the responder?
  onSelectionChangeShouldSetResponder?: (event: ResponderEvent) => boolean;
  onSelectionChangeShouldSetResponderCapture?: (event: ResponderEvent) => boolean;
  // On pointer down, should this element become the responder?
  onStartShouldSetResponder?: (event: ResponderEvent) => boolean;
  onStartShouldSetResponderCapture?: (event: ResponderEvent) => boolean;
}
