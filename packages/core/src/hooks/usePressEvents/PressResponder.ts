import type { ResponderConfig, ResponderEvent } from '../useResponderEvents';

export interface PressResponderConfig {
  /**
   * The gesture can be interrupted by a parent gesture, e.g., scroll. Defaults
   * to `true`.
   */
  cancelable?: boolean;
  /**
   * Whether to disable initialization of the press gesture.
   */
  disabled?: boolean;
  /**
   * Duration (in addition to `delayPressIn`) after which a press gesture is
   * considered a long press gesture. Defaults to 500 (milliseconds).
   */
  delayLongPress?: number;
  /**
   * Duration to wait after press down before calling `onPressIn`.
   */
  delayPressIn?: number;
  /**
   * Duration to wait after letting up before calling `onPressOut`.
   */
  delayPressOut?: number;
  /**
   * Called when a long press gesture has been triggered.
   */
  onLongPress?: (event: ResponderEvent) => void;
  /**
   * Called when a press gestute has been triggered.
   */
  onPress?: (event: ResponderEvent) => void;
  /**
   * Called when the press is activated to provide visual feedback.
   */
  onPressChange?: (activated: boolean) => void;
  /**
   * Called when the press is activated to provide visual feedback.
   */
  onPressIn?: (event: ResponderEvent) => void;
  /**
   * Called when the press location moves. This should rarely be used.
   */
  onPressMove?: (event: ResponderEvent) => void;
  /**
   * Called when the press is deactivated to undo visual feedback.
   */
  onPressOut?: (event: ResponderEvent) => void;
}

export interface EventHandlers
  extends Required<
    Pick<
      ResponderConfig,
      | 'onResponderGrant'
      | 'onResponderMove'
      | 'onResponderRelease'
      | 'onResponderTerminate'
      | 'onResponderTerminationRequest'
      | 'onStartShouldSetResponder'
    >
  > {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
}

type TouchState =
  | 'NOT_RESPONDER'
  | 'RESPONDER_INACTIVE_PRESS_START'
  | 'RESPONDER_ACTIVE_PRESS_START'
  | 'RESPONDER_ACTIVE_LONG_PRESS_START'
  | 'ERROR';

type TouchSignal =
  | 'DELAY'
  | 'RESPONDER_GRANT'
  | 'RESPONDER_RELEASE'
  | 'RESPONDER_TERMINATED'
  | 'LONG_PRESS_DETECTED';

const DELAY = 'DELAY';
const ERROR = 'ERROR';
const LONG_PRESS_DETECTED = 'LONG_PRESS_DETECTED';
const NOT_RESPONDER = 'NOT_RESPONDER';
const RESPONDER_ACTIVE_LONG_PRESS_START = 'RESPONDER_ACTIVE_LONG_PRESS_START';
const RESPONDER_ACTIVE_PRESS_START = 'RESPONDER_ACTIVE_PRESS_START';
const RESPONDER_INACTIVE_PRESS_START = 'RESPONDER_INACTIVE_PRESS_START';
const RESPONDER_GRANT = 'RESPONDER_GRANT';
const RESPONDER_RELEASE = 'RESPONDER_RELEASE';
const RESPONDER_TERMINATED = 'RESPONDER_TERMINATED';

const transitions = Object.freeze({
  NOT_RESPONDER: {
    DELAY: ERROR,
    RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
    RESPONDER_RELEASE: ERROR,
    RESPONDER_TERMINATED: ERROR,
    LONG_PRESS_DETECTED: ERROR,
  },
  RESPONDER_INACTIVE_PRESS_START: {
    DELAY: RESPONDER_ACTIVE_PRESS_START,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: ERROR,
  },
  RESPONDER_ACTIVE_PRESS_START: {
    DELAY: ERROR,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START,
  },
  RESPONDER_ACTIVE_LONG_PRESS_START: {
    DELAY: ERROR,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START,
  },
  ERROR: {
    DELAY: NOT_RESPONDER,
    RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: NOT_RESPONDER,
  },
} as const);

function isActiveSignal(signal: TouchState) {
  return signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
}

function isButtonRole(element: HTMLElement) {
  return element.getAttribute('role') === 'button';
}

function isPressStartSignal(signal: TouchState) {
  return (
    signal === RESPONDER_INACTIVE_PRESS_START ||
    signal === RESPONDER_ACTIVE_PRESS_START ||
    signal === RESPONDER_ACTIVE_LONG_PRESS_START
  );
}

function isTerminalSignal(signal: TouchSignal) {
  return signal === RESPONDER_TERMINATED || signal === RESPONDER_RELEASE;
}

function isValidKeyPress(event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
  const spacebar = event.key === ' ' || event.key === 'Spacebar';
  const buttonish =
    (event.target as HTMLElement).tagName.toLowerCase() === 'button' ||
    isButtonRole(event.target as HTMLElement);
  return event.key === 'Enter' || (spacebar && buttonish);
}

const DEFAULT_LONG_PRESS_DELAY_MS = 450; // 500 - 50
const DEFAULT_PRESS_DELAY_MS = 50;

function normalizeDelay(delay?: number, min = 0, fallback = 0) {
  return Math.max(min, delay ?? fallback);
}

function getTouchFromResponderEvent(event: ResponderEvent) {
  if (event.nativeEvent.touches.length > 0) {
    return event.nativeEvent.touches[0];
  }
  if (event.nativeEvent.changedTouches.length > 0) {
    return event.nativeEvent.changedTouches[0];
  }
  return event.nativeEvent;
}

/**
 * ========================== PressResponder Tutorial ==========================
 *
 * The `PressResponder` class helps you create press interactions by analyzing
 * the geometry of elements and observing when another responder (e.g.
 * `ScrollView`) has stolen the touch lock. It offers hooks for your component
 * to provide interaction feedback to the user:
 *
 * - When a press has activated (e.g. highlight an element)
 * - When a press has deactivated (e.g. un-highlight an element)
 * - When a press sould trigger an action, meaning it activated and deactivated
 *   while within the geometry of the element without the lock being stolen.
 *
 * A high quality interaction isn't as simple as you might think. There should
 * be a slight delay before activation. Moving your finger beyond an element's
 * bounds should trigger deactivation, but moving the same finger back within an
 * element's bounds should trigger reactivation.
 *
 * In order to use `PressResponder`, do the following:
 *
 * 1. Create a `PressResponder` instance with the desired configuration.
 *
 *    ```tsx
 *    const pressResponder = new PressResponder(config);
 *    ```
 *
 * 2. Choose the rendered component who should collect the press events. On that
 *    element, spread `pressability.getEventHandlers()` into its props.
 *
 *    ```tsx
 *    return (
 *      <View {...this.state.pressResponder.getEventHandlers()} />
 *    );
 *    ```
 *
 * 3. Reset `PressResponder` when your component unmounts.
 *
 *    ```tsx
 *    componentWillUnmount() {
 *      this.state.pressResponder.reset();
 *    }
 *    ```
 *
 * ========================== Implementation Details ===========================
 *
 * `PressResponder` only assumes that there exists a `HitRect` node. The `PressRect`
 * is an abstract box that is extended beyond the `HitRect`.
 *
 * ## Geometry
 *
 * ```txt
 *  ┌────────────────────────┐
 *  │  ┌──────────────────┐  │ - Presses start anywhere within `HitRect`.
 *  │  │  ┌────────────┐  │  │
 *  │  │  │ VisualRect │  │  │
 *  │  │  └────────────┘  │  │ - When pressed down for sufficient amount of time
 *  │  │    HitRect       │  │   before letting up, `VisualRect` activates.
 *  │  └──────────────────┘  │
 *  │       Out Region   o   │
 *  └────────────────────│───┘
 *                       └────── When the press is released outside `HitRect`,
 *                               the responder is NOT eligible for a press.
 * ```
 *
 * ## State Machine
 *
 * ```txt
 * ┌───────────────┐ ◀──── RESPONDER_RELEASE
 * │ NOT_RESPONDER │
 * └───┬───────────┘ ◀──── RESPONDER_TERMINATED
 *     │
 *     │ RESPONDER_GRANT (HitRect)
 *     │
 *     ▼
 * ┌─────────────────────┐          ┌───────────────────┐              ┌───────────────────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │  T + DELAY   │ RESPONDER_ACTIVE_ │
 * │ PRESS_START         ├────────▶ │ PRESS_START       ├────────────▶ │ LONG_PRESS_START  │
 * └─────────────────────┘          └───────────────────┘              └───────────────────┘
 *
 * T + DELAY => LONG_PRESS_DELAY + DELAY
 * ```
 *
 * Not drawn are the side effects of each transition. The most important side
 * effect is the invocation of `onLongPress`. Only when the browser produces a
 * `click` event is `onPress` invoked.
 */
export class PressResponder {
  #config: PressResponderConfig;

  #eventHandlers?: EventHandlers;

  #pointerTouch: boolean = false;

  #longPressDelayTimeout?: ReturnType<typeof setTimeout>;

  #longPressDispatched: boolean = false;

  #pressDelayTimeout?: ReturnType<typeof setTimeout>;

  #pressOutDelayTimeout?: ReturnType<typeof setTimeout>;

  #selectionTerminated: boolean = false;

  #touchActivatePosition?: {
    pageX: number;
    pageY: number;
  };

  #touchState: TouchState = NOT_RESPONDER;

  #responderElement: HTMLElement | null = null;

  constructor(config: PressResponderConfig) {
    this.#config = config;
  }

  reconfigure(config: PressResponderConfig) {
    this.#config = config;
  }

  /**
   * Resets any pending timers. This should be called on unmount.
   */
  reset() {
    this.#cancelLongPressDelayTimeout();
    this.#cancelPressDelayTimeout();
    this.#cancelPressOutDelayTimeout();
  }

  /**
   * Returns a set of props to spread into the interactive element.
   */
  getEventHandlers() {
    if (this.#eventHandlers == null) {
      this.#eventHandlers = this.#createEventHandlers();
    }
    return this.#eventHandlers;
  }

  #createEventHandlers(): EventHandlers {
    const start = (
      event: React.KeyboardEvent<HTMLElement> | ResponderEvent,
      shouldDelay = true,
    ) => {
      event.persist();

      this.#cancelPressOutDelayTimeout();

      this.#longPressDispatched = false;
      this.#selectionTerminated = false;
      this.#touchState = NOT_RESPONDER;
      this.#pointerTouch =
        (event as any).nativeEvent.type === 'touchstart' || event.type === 'touchstart';

      this.#receiveSignal(RESPONDER_GRANT, event);

      const delayPressIn = normalizeDelay(this.#config.delayPressIn, 0, DEFAULT_PRESS_DELAY_MS);

      if (shouldDelay !== false && delayPressIn > 0) {
        this.#pressDelayTimeout = setTimeout(() => {
          this.#receiveSignal(DELAY, event);
        }, delayPressIn);
      } else {
        this.#receiveSignal(DELAY, event);
      }

      const delayLongPress = normalizeDelay(
        this.#config.delayLongPress,
        10,
        DEFAULT_LONG_PRESS_DELAY_MS,
      );
      this.#longPressDelayTimeout = setTimeout(() => {
        this.#handleLongPress(event as ResponderEvent);
      }, delayLongPress + delayPressIn);
    };

    const end = (event: KeyboardEvent | ResponderEvent) => {
      this.#receiveSignal(RESPONDER_RELEASE, event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { onPress } = this.#config;

      if (this.#touchState !== NOT_RESPONDER && isValidKeyPress(event)) {
        end(event);
        document.removeEventListener('keyup', handleKeyUp);

        const role = (event.target as HTMLElement).getAttribute('role');
        const elementType = (event.target as HTMLElement).tagName.toLowerCase();

        const nativeInteractiveElement =
          role === 'link' ||
          elementType === 'a' ||
          elementType === 'button' ||
          elementType === 'input' ||
          elementType === 'select' ||
          elementType === 'textarea';

        if (!nativeInteractiveElement && this.#responderElement === event.target) {
          onPress?.(event as any);
        }

        this.#responderElement = null;
      }
    };

    return {
      onStartShouldSetResponder: (event) => {
        const { disabled } = this.#config;
        if (disabled && isButtonRole(event.currentTarget)) {
          event.stopPropagation();
        }
        if (disabled == null) {
          return true;
        }
        return !disabled;
      },
      onKeyDown: (event) => {
        const { disabled } = this.#config;
        if (!disabled && isValidKeyPress(event)) {
          if (this.#touchState === NOT_RESPONDER) {
            start(event, false);
            this.#responderElement = event.target as HTMLElement | null;
            // Listen to 'keyup' on document to account for situations where
            // focus is moved to another element during 'keydown'.
            document.addEventListener('keyup', handleKeyUp);
          }
          const spacebar = event.key === ' ' || event.key === 'Spacebar';
          const role = (event.target as HTMLElement).getAttribute('role');
          const buttonLikeRole = role === 'button' || role === 'menuitem';
          if (
            spacebar &&
            buttonLikeRole &&
            (event.target as HTMLElement).tagName.toLowerCase() !== 'button'
          ) {
            // Prevent spacebar scrolling the window if using non-native button
            event.preventDefault();
          }
          event.stopPropagation();
        }
      },
      onResponderGrant: (event) => start(event),
      onResponderMove: (event) => {
        const { onPressMove } = this.#config;
        onPressMove?.(event);
        const touch = getTouchFromResponderEvent(event);
        if (this.#touchActivatePosition != null) {
          const deltaX = this.#touchActivatePosition.pageX - touch.pageX;
          const deltaY = this.#touchActivatePosition.pageY - touch.pageY;
          if (Math.hypot(deltaX, deltaY) > 10) {
            this.#cancelLongPressDelayTimeout();
          }
        }
      },
      onResponderRelease: (event) => end(event),
      onResponderTerminate: (event) => {
        if (event.type === 'selectionchange') {
          this.#selectionTerminated = true;
        }
        this.#receiveSignal(RESPONDER_TERMINATED, event);
      },
      onResponderTerminationRequest: (event) => {
        const { cancelable, disabled, onLongPress } = this.#config;
        // If `onLongPress` is provided, don't terminate on `contextmenu` as
        // default behavior will be prevented for non-mouse pointers.
        if (
          !disabled &&
          onLongPress != null &&
          this.#pointerTouch &&
          event.type === 'contextmenu'
        ) {
          return false;
        }
        if (cancelable == null) {
          return true;
        }
        return cancelable;
      },
      // NOTE: This diverges from react-native in 3 significant ways:
      // - The `onPress` callback is not connected to the responder system (the
      //   native `click` event must be used but is dispatched in many scenarios
      //   where no pointers are on the screen.) Therefore, it's possible for
      //   `onPress` to be called without `onPress{In,Out}` being called first.
      // - The `onPress` callback is only be called on the first ancestor of the
      //   native `click` target that is using the `PressResponder`.
      // - The event's `nativeEvent` is a `MouseEvent` not a `TouchEvent`.
      onClick: (event) => {
        const { disabled, onPress } = this.#config;
        if (!disabled) {
          // If long press dispatched, cancel default click behavior.
          // If the responder terminated because text was selected during the
          // gesture, cancel the default click behavior.
          event.stopPropagation();
          if (this.#longPressDispatched || this.#selectionTerminated) {
            event.preventDefault();
          } else if (event.altKey === false) {
            onPress?.(event as any);
          }
        } else if (isButtonRole(event.currentTarget as HTMLElement)) {
          event.stopPropagation();
        }
      },
      // If `onLongPress` is provided and a touch pointer is being used, prevent
      // the default context menu from opening.
      onContextMenu: (event) => {
        const { disabled, onLongPress } = this.#config;
        if (!disabled) {
          if (onLongPress != null && this.#pointerTouch && !event.defaultPrevented) {
            event.preventDefault();
            event.stopPropagation();
          }
        } else if (isButtonRole(event.currentTarget as HTMLElement)) {
          event.stopPropagation();
        }
      },
    };
  }

  /**
   * Receives a state machine signal, performs side effects of the transition
   * and stores the new state. Validates the transition as well.
   */
  #receiveSignal(
    signal: TouchSignal,
    event: React.KeyboardEvent<HTMLElement> | KeyboardEvent | ResponderEvent,
  ) {
    const prevState = this.#touchState;
    let nextState = null;
    if (transitions[prevState] != null) {
      nextState = transitions[prevState][signal];
    }
    if (this.#touchState === NOT_RESPONDER && signal === RESPONDER_RELEASE) {
      return;
    }
    if (nextState == null || nextState === ERROR) {
      console.error(`PressResponder: Invalid signal ${signal} for state ${prevState} on responder`);
    } else if (prevState !== nextState) {
      this.#performTransitionSideEffects(prevState, nextState, signal, event);
      this.#touchState = nextState;
    }
  }

  /**
   * Performs a transition between touchable states and identify any activations
   * or deactivations (and callback invocations).
   */
  #performTransitionSideEffects(
    prevState: TouchState,
    nextState: TouchState,
    signal: TouchSignal,
    event: React.KeyboardEvent<HTMLElement> | KeyboardEvent | ResponderEvent,
  ) {
    if (isTerminalSignal(signal)) {
      // Pressable suppression of contextmenu on windows.
      // On Windows, the contextmenu is displayed after pointerup.
      // https://github.com/necolas/react-native-web/issues/2296
      setTimeout(() => {
        this.#pointerTouch = false;
      }, 0);
      this.#touchActivatePosition = undefined;
      this.#cancelLongPressDelayTimeout();
    }

    if (isPressStartSignal(prevState) && signal === LONG_PRESS_DETECTED) {
      const { onLongPress } = this.#config;
      // Long press is not supported for keyboards because `click` can be
      // dispatched immediately (and multiple times) after `keydown`.
      if (onLongPress != null && (event as any).nativeEvent.key == null) {
        onLongPress(event as ResponderEvent);
        this.#longPressDispatched = true;
      }
    }

    const prevActive = isActiveSignal(prevState);
    const nextActive = isActiveSignal(nextState);

    if (!prevActive && nextActive) {
      this.#activate(event as ResponderEvent);
    } else if (prevActive && !nextActive) {
      this.#deactivate(event as ResponderEvent);
    }

    if (isPressStartSignal(prevState) && signal === RESPONDER_RELEASE) {
      const { onLongPress, onPress } = this.#config;
      if (
        onPress != null &&
        (onLongPress == null || prevState !== RESPONDER_ACTIVE_LONG_PRESS_START) &&
        // If we never activated (due to delays), activate and deactivate now.
        !nextActive &&
        !prevActive
      ) {
        this.#activate(event as ResponderEvent);
        this.#deactivate(event as ResponderEvent);
      }
    }

    this.#cancelPressDelayTimeout();
  }

  #activate(event: ResponderEvent) {
    const { onPressChange, onPressIn } = this.#config;
    const touch = getTouchFromResponderEvent(event);
    this.#touchActivatePosition = {
      pageX: touch.pageX,
      pageY: touch.pageY,
    };
    onPressIn?.(event);
    onPressChange?.(true);
  }

  #deactivate(event: ResponderEvent) {
    const { onPressChange, onPressOut } = this.#config;
    const end = () => {
      onPressOut?.(event);
      onPressChange?.(false);
    };
    const delayPressOut = normalizeDelay(this.#config.delayPressOut);
    if (delayPressOut > 0) {
      this.#pressOutDelayTimeout = setTimeout(() => {
        end();
      }, delayPressOut);
    } else {
      end();
    }
  }

  #handleLongPress(event: ResponderEvent) {
    if (
      this.#touchState === RESPONDER_ACTIVE_PRESS_START ||
      this.#touchState === RESPONDER_ACTIVE_LONG_PRESS_START
    ) {
      this.#receiveSignal(LONG_PRESS_DETECTED, event);
    }
  }

  #cancelLongPressDelayTimeout() {
    if (this.#longPressDelayTimeout != null) {
      clearTimeout(this.#longPressDelayTimeout);
      this.#longPressDelayTimeout = undefined;
    }
  }

  #cancelPressDelayTimeout() {
    if (this.#pressDelayTimeout != null) {
      clearTimeout(this.#pressDelayTimeout);
      this.#pressDelayTimeout = undefined;
    }
  }

  #cancelPressOutDelayTimeout() {
    if (this.#pressOutDelayTimeout != null) {
      clearTimeout(this.#pressOutDelayTimeout);
      this.#pressOutDelayTimeout = undefined;
    }
  }
}
