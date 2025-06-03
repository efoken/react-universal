import type { PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import type { ResponderConfig, ResponderEvent } from './hooks/useResponderEvents';
import type { TouchHistory } from './hooks/useResponderEvents/ResponderTouchHistoryStore';
import { TouchHistoryMath } from './hooks/useResponderEvents/TouchHistoryMath';

type InteractionState = {
  shouldCancelClick: boolean;
  timeout: ReturnType<typeof setTimeout> | null;
};

export interface PanResponderInstance {
  panHandlers: ResponderConfig & {
    onClickCapture?: (event: any) => void;
  };
}

export class PanResponder {
  static #setInteractionTimeout(interactionState: InteractionState) {
    interactionState.timeout = setTimeout(() => {
      interactionState.shouldCancelClick = false;
    }, 250);
  }

  static #clearInteractionTimeout(interactionState: InteractionState) {
    if (interactionState.timeout) {
      clearTimeout(interactionState.timeout);
    }
  }

  static #initializeGestureState(gestureState: PanResponderGestureState) {
    gestureState.moveX = 0;
    gestureState.moveY = 0;
    gestureState.x0 = 0;
    gestureState.y0 = 0;
    gestureState.dx = 0;
    gestureState.dy = 0;
    gestureState.vx = 0;
    gestureState.vy = 0;
    gestureState.numberActiveTouches = 0;
    // All `gestureState` accounts for timeStamps up until:
    gestureState._accountsForMovesUpTo = 0;
  }

  /**
   * This is nuanced and is necessary. It is incorrect to continuously take all
   * active _and_ recently moved touches, find the centroid, and track how that
   * result changes over time. Instead, we must take all recently moved touches,
   * and calculate how the centroid has changed just for those recently moved
   * touches, and append that change to an accumulator. This is to (at least)
   * handle the case where the user is moving three fingers, and then one of the
   * fingers stops but the other two continue.
   *
   * This is very different than taking all of the recently moved touches and
   * storing their centroid as `dx/dy`. For correctness, we must _accumulate
   * changes_ in the centroid of recently moved touches.
   *
   * There is also some nuance with how we handle multiple moved touches in a
   * single event. With the way `ReactNativeEventEmitter` dispatches touches as
   * individual events, multiple touches generate two 'move' events, each of
   * them triggering `onResponderMove`. But with the way `PanResponder` works,
   * all of the gesture inference is performed on the first dispatch, since it
   * looks at all of the touches (even the ones for which there hasn't been a
   * native dispatch yet). Therefore, `PanResponder` does not call
   * `onResponderMove` passed the first dispatch. This diverges from the typical
   * responder callback pattern (without using `PanResponder`), but avoids more
   * dispatches than necessary.
   */
  static #updateGestureStateOnMove(
    gestureState: PanResponderGestureState,
    touchHistory: TouchHistory,
  ) {
    const movedAfter = gestureState._accountsForMovesUpTo;
    gestureState.numberActiveTouches = touchHistory.numberActiveTouches;
    gestureState.moveX = TouchHistoryMath.currentCentroidXOfTouchesChangedAfter(
      touchHistory,
      movedAfter,
    );
    gestureState.moveY = TouchHistoryMath.currentCentroidYOfTouchesChangedAfter(
      touchHistory,
      movedAfter,
    );
    const prevX = TouchHistoryMath.previousCentroidXOfTouchesChangedAfter(touchHistory, movedAfter);
    const x = TouchHistoryMath.currentCentroidXOfTouchesChangedAfter(touchHistory, movedAfter);
    const prevY = TouchHistoryMath.previousCentroidYOfTouchesChangedAfter(touchHistory, movedAfter);
    const y = TouchHistoryMath.currentCentroidYOfTouchesChangedAfter(touchHistory, movedAfter);
    const nextDX = gestureState.dx + (x - prevX);
    const nextDY = gestureState.dy + (y - prevY);

    const dt = touchHistory.mostRecentTimeStamp - movedAfter;
    gestureState.vx = (nextDX - gestureState.dx) / dt;
    gestureState.vy = (nextDY - gestureState.dy) / dt;

    gestureState.dx = nextDX;
    gestureState.dy = nextDY;
    gestureState._accountsForMovesUpTo = touchHistory.mostRecentTimeStamp;
  }

  /**
   * @param config Enhanced versions of all of the responder callbacks that
   * provide not only the typical `ResponderSyntheticEvent`, but also the
   * `PanResponder` gesture state. Simply replace the word `Responder` with
   * `PanResponder` in each of the typical `onResponder*` callbacks. For example,
   * the `config` object would look like:
   *
   *  - `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onPanResponderReject: (e, gestureState) => {...}`
   *  - `onPanResponderGrant: (e, gestureState) => {...}`
   *  - `onPanResponderStart: (e, gestureState) => {...}`
   *  - `onPanResponderEnd: (e, gestureState) => {...}`
   *  - `onPanResponderRelease: (e, gestureState) => {...}`
   *  - `onPanResponderMove: (e, gestureState) => {...}`
   *  - `onPanResponderTerminate: (e, gestureState) => {...}`
   *  - `onPanResponderTerminationRequest: (e, gestureState) => {...}`
   *  - `onShouldBlockNativeResponder: (e, gestureState) => {...}`
   *
   *  In general, for events that have capture equivalents, we update the
   *  gestureState once in the capture phase and can use it in the bubble phase
   *  as well.
   *
   *  Be careful with `onStartShould*` callbacks. They only reflect updated
   *  `gestureState` for start/end events that bubble/capture to the Node. Once
   *  the node is the responder, you can rely on every start/end event being
   *  processed by the gesture and `gestureState` being updated accordingly.
   *  (numberActiveTouches) may not be totally accurate unless you are the
   *  responder.
   */
  static create(config: PanResponderCallbacks): PanResponderInstance {
    const interactionState: InteractionState = {
      shouldCancelClick: false,
      timeout: null,
    };

    const gestureState: PanResponderGestureState = {
      // Useful for debugging
      stateID: Math.random(),
      moveX: 0,
      moveY: 0,
      x0: 0,
      y0: 0,
      dx: 0,
      dy: 0,
      vx: 0,
      vy: 0,
      numberActiveTouches: 0,
      _accountsForMovesUpTo: 0,
    };

    const panHandlers: ResponderConfig & {
      onClickCapture?: (event: any) => void;
    } = {
      onStartShouldSetResponder: (event) =>
        config.onStartShouldSetPanResponder == null
          ? false
          : config.onStartShouldSetPanResponder(event, gestureState),
      onMoveShouldSetResponder: (event) =>
        config.onMoveShouldSetPanResponder == null
          ? false
          : config.onMoveShouldSetPanResponder(event, gestureState),
      onStartShouldSetResponderCapture: (event) => {
        if (event.nativeEvent.touches.length === 1) {
          PanResponder.#initializeGestureState(gestureState);
        }
        gestureState.numberActiveTouches = event.touchHistory.numberActiveTouches;
        return config.onStartShouldSetPanResponderCapture == null
          ? false
          : config.onStartShouldSetPanResponderCapture(event, gestureState);
      },
      onMoveShouldSetResponderCapture: (event) => {
        // ResponderSystem incorrectly dispatches should* to current responder.
        // Filter out any touch moves past the first one - we would have already
        // processed multi-touch geometry during the first event.
        if (gestureState._accountsForMovesUpTo === event.touchHistory.mostRecentTimeStamp) {
          return false;
        }
        PanResponder.#updateGestureStateOnMove(gestureState, event.touchHistory);
        return config.onMoveShouldSetPanResponderCapture == null
          ? false
          : config.onMoveShouldSetPanResponderCapture(event, gestureState);
      },
      onResponderGrant: (event) => {
        PanResponder.#clearInteractionTimeout(interactionState);
        interactionState.shouldCancelClick = true;
        gestureState.x0 = TouchHistoryMath.currentCentroidX(event.touchHistory);
        gestureState.y0 = TouchHistoryMath.currentCentroidY(event.touchHistory);
        gestureState.dx = 0;
        gestureState.dy = 0;
        config.onPanResponderGrant?.(event, gestureState);
        return config.onShouldBlockNativeResponder == null
          ? true
          : config.onShouldBlockNativeResponder(event, gestureState);
      },
      onResponderReject: (event) => {
        config.onPanResponderReject?.(event, gestureState);
      },
      onResponderRelease: (event) => {
        config.onPanResponderRelease?.(event, gestureState);
        PanResponder.#setInteractionTimeout(interactionState);
        PanResponder.#initializeGestureState(gestureState);
      },
      onResponderStart: (event) => {
        gestureState.numberActiveTouches = event.touchHistory.numberActiveTouches;
        config.onPanResponderStart?.(event, gestureState);
      },
      onResponderMove: (event) => {
        // Guard against the dispatch of two touch moves when there are two
        // simultaneously changed touches.
        if (gestureState._accountsForMovesUpTo === event.touchHistory.mostRecentTimeStamp) {
          return;
        }
        // Filter out any touch moves past the first one - we would have already
        // processed multi-touch geometry during the first event.
        PanResponder.#updateGestureStateOnMove(gestureState, event.touchHistory);
        config.onPanResponderMove?.(event, gestureState);
      },
      onResponderEnd: (event) => {
        gestureState.numberActiveTouches = event.touchHistory.numberActiveTouches;
        config.onPanResponderEnd?.(event, gestureState);
      },
      onResponderTerminate: (event) => {
        config.onPanResponderTerminate?.(event, gestureState);
        PanResponder.#setInteractionTimeout(interactionState);
        PanResponder.#initializeGestureState(gestureState);
      },
      onResponderTerminationRequest: (event: ResponderEvent) =>
        config.onPanResponderTerminationRequest == null
          ? true
          : config.onPanResponderTerminationRequest(event, gestureState),
      // We do not want to trigger 'click' activated gestures or native
      // behaviors on any pan target that is under a mouse cursor when it is
      // released. Browsers will natively cancel 'click' events on a target if a
      // non-mouse active pointer moves.
      onClickCapture: (event) => {
        if (interactionState.shouldCancelClick) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
    };

    return { panHandlers };
  }
}
