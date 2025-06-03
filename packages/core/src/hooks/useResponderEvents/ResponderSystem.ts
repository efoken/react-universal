import { isClient } from '@tamagui/constants';
import type { ResponderEvent } from './createResponderEvent';
import { createResponderEvent } from './createResponderEvent';
import { ResponderTouchHistoryStore } from './ResponderTouchHistoryStore';
import {
  getLowestCommonAncestor,
  getResponderPaths,
  hasTargetTouches,
  hasValidSelection,
  isCancelish,
  isEndish,
  isMoveish,
  isPrimaryPointerDown,
  isScroll,
  isSelectionChange,
  isStartish,
  setResponderId,
} from './utils';

type ActiveResponderInstance = {
  id: number;
  idPath: number[];
  node: any;
};

type EmptyResponderInstance = {
  id: null;
  idPath: null;
  node: null;
};

type ResponderInstance = ActiveResponderInstance | EmptyResponderInstance;

export interface ResponderConfig {
  // Direct responder events dispatched directly to responder. Do not bubble.
  onResponderEnd?: (e: ResponderEvent) => void;
  onResponderGrant?: ((e: ResponderEvent) => void) | ((e: ResponderEvent) => boolean);
  onResponderMove?: (e: ResponderEvent) => void;
  onResponderReject?: (e: ResponderEvent) => void;
  onResponderRelease?: (e: ResponderEvent) => void;
  onResponderStart?: (e: ResponderEvent) => void;
  onResponderTerminate?: (e: ResponderEvent) => void;
  onResponderTerminationRequest?: (e: ResponderEvent) => boolean;
  // On pointer down, should this element become the responder?
  onStartShouldSetResponder?: (e: ResponderEvent) => boolean;
  onStartShouldSetResponderCapture?: (e: ResponderEvent) => boolean;
  // On pointer move, should this element become the responder?
  onMoveShouldSetResponder?: (e: ResponderEvent) => boolean;
  onMoveShouldSetResponderCapture?: (e: ResponderEvent) => boolean;
  // On scroll, should this element become the responder? Do no bubble
  onScrollShouldSetResponder?: (e: ResponderEvent) => boolean;
  onScrollShouldSetResponderCapture?: (e: ResponderEvent) => boolean;
  // On text selection change, should this element become the responder?
  onSelectionChangeShouldSetResponder?: (e: ResponderEvent) => boolean;
  onSelectionChangeShouldSetResponderCapture?: (e: ResponderEvent) => boolean;
}

declare global {
  interface Window {
    __reactResponderSystemActive?: boolean;
  }
}

const shouldSetResponderEvents: Record<
  string,
  [
    captureName: keyof ResponderConfig,
    bubbleName: keyof ResponderConfig,
    config: { bubbles: boolean },
  ]
> = {
  touchstart: ['onStartShouldSetResponderCapture', 'onStartShouldSetResponder', { bubbles: true }],
  mousedown: ['onStartShouldSetResponderCapture', 'onStartShouldSetResponder', { bubbles: true }],
  touchmove: ['onMoveShouldSetResponderCapture', 'onMoveShouldSetResponder', { bubbles: true }],
  mousemove: ['onMoveShouldSetResponderCapture', 'onMoveShouldSetResponder', { bubbles: true }],
  scroll: ['onScrollShouldSetResponderCapture', 'onScrollShouldSetResponder', { bubbles: false }],
};

const emptyResponder = { id: null, idPath: null, node: null };

/**
 * Attach Listeners
 *
 * Use native events as ReactDOM doesn't have a non-plugin API to implement
 * this system.
 */
const documentEventsCapturePhase = ['blur', 'scroll'] as const;
const documentEventsBubblePhase = [
  // mouse
  'mousedown',
  'mousemove',
  'mouseup',
  'dragstart',
  // touch
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  // other
  'contextmenu',
  'select',
  'selectionchange',
] as const;

export class ResponderSystem {
  static #responderListenersMap = new Map<number, ResponderConfig>();

  static #emulatingMouseEvents = false;

  static #trackedTouchCount = 0;

  static #responder: ResponderInstance = {
    id: null,
    node: null,
    idPath: null,
  };

  static #responderTouchHistoryStore = new ResponderTouchHistoryStore();

  static #setResponder(responder: ResponderInstance) {
    ResponderSystem.#responder = responder;
  }

  static #getResponderConfig(id: number): ResponderConfig {
    return ResponderSystem.#responderListenersMap.get(id) ?? {};
  }

  /**
   * Process native events
   *
   * A single event listener is used to manage the responder system.
   * All pointers are tracked in the ResponderTouchHistoryStore. Native events
   * are interpreted in terms of the Responder System and checked to see if
   * the responder should be transferred. Each host node that is attached to
   * the Responder System has an ID, which is used to look up its associated
   * callbacks.
   */
  static #eventListener = (domEvent: MouseEvent | TouchEvent | DragEvent | FocusEvent | Event) => {
    const eventType = domEvent.type;
    const eventTarget = domEvent.target as Window | HTMLElement | null;

    /**
     * Manage emulated events and early bailout.
     * Since PointerEvent is not used yet (lack of support in older Safari), it's
     * necessary to manually manage the mess of browser touch/mouse events.
     * And bailout early for termination events when there is no active responder.
     */

    // Flag when browser may produce emulated events
    if (eventType === 'touchstart') {
      this.#emulatingMouseEvents = true;
    }
    // Remove flag when browser will not produce emulated events
    if (eventType === 'touchmove' || this.#trackedTouchCount > 1) {
      this.#emulatingMouseEvents = false;
    }
    // Ignore various events in particular circumstances
    if (
      // Ignore browser emulated mouse events
      (eventType === 'mousedown' && this.#emulatingMouseEvents) ||
      (eventType === 'mousemove' && this.#emulatingMouseEvents) ||
      // Ignore mousemove if a mousedown didn't occur first
      (eventType === 'mousemove' && this.#trackedTouchCount < 1)
    ) {
      return;
    }
    // Remove flag after emulated events are finished
    if (this.#emulatingMouseEvents && eventType === 'mouseup') {
      if (this.#trackedTouchCount === 0) {
        this.#emulatingMouseEvents = false;
      }
      return;
    }

    const startEvent = isStartish(domEvent) && isPrimaryPointerDown(domEvent);
    const responderEvent = createResponderEvent(domEvent, this.#responderTouchHistoryStore);

    // Record the state of active pointers
    if (startEvent || isMoveish(domEvent) || isEndish(domEvent)) {
      if ('touches' in domEvent) {
        this.#trackedTouchCount = domEvent.touches.length;
      } else if (startEvent) {
        this.#trackedTouchCount = 1;
      } else if (isEndish(domEvent)) {
        this.#trackedTouchCount = 0;
      }
      this.#responderTouchHistoryStore.recordTouchTrack(domEvent, responderEvent.nativeEvent);
    }

    let eventPaths: { idPath: number[]; nodePath: any[] } | null = getResponderPaths(domEvent);
    let negotiated = false;
    let wantsResponder: ResponderInstance | undefined;

    // If an event occured that might change the current responder...
    if (startEvent || isMoveish(domEvent) || (isScroll(domEvent) && this.#trackedTouchCount > 0)) {
      // If there is already a responder, prune the event paths to the lowest common ancestor
      // of the existing responder and deepest target of the event.
      const currentResponderIdPath = this.#responder.idPath;
      const eventIdPath = eventPaths.idPath;

      if (currentResponderIdPath != null && eventIdPath != null) {
        const lowestCommonAncestor = getLowestCommonAncestor(currentResponderIdPath, eventIdPath);
        if (lowestCommonAncestor != null) {
          const indexOfLowestCommonAncestor = eventIdPath.indexOf(lowestCommonAncestor);
          // Skip the current responder so it doesn't receive unexpected "shouldSet" events.
          const index =
            indexOfLowestCommonAncestor + (lowestCommonAncestor === this.#responder.id ? 1 : 0);
          eventPaths = {
            idPath: eventIdPath.slice(index),
            nodePath: eventPaths.nodePath.slice(index),
          };
        } else {
          eventPaths = null;
        }
      }

      if (eventPaths != null) {
        // If a node wants to become the responder, attempt to transfer.
        wantsResponder = this.#findWantsResponder(eventPaths, domEvent, responderEvent);
        if (wantsResponder != null) {
          // Sets responder if none exists, or negotates with existing responder.
          this.#attemptTransfer(responderEvent, wantsResponder);
          negotiated = true;
        }
      }
    }

    // If there is now a responder, invoke its callbacks for the lifecycle of the gesture.
    if (this.#responder.id != null && this.#responder.node != null) {
      const { id, node } = this.#responder;
      const {
        onResponderStart,
        onResponderMove,
        onResponderEnd,
        onResponderRelease,
        onResponderTerminate,
        onResponderTerminationRequest,
      } = this.#getResponderConfig(id);

      responderEvent.bubbles = false;
      responderEvent.cancelable = false;
      responderEvent.currentTarget = node;

      if (startEvent) {
        if (onResponderStart != null) {
          responderEvent.dispatchConfig.registrationName = 'onResponderStart';
          onResponderStart(responderEvent);
        }
      } else if (isMoveish(domEvent)) {
        if (onResponderMove != null) {
          responderEvent.dispatchConfig.registrationName = 'onResponderMove';
          onResponderMove(responderEvent);
        }
      } else {
        const terminateEvent =
          isCancelish(domEvent) ||
          // native context menu
          eventType === 'contextmenu' ||
          // window blur
          (eventType === 'blur' && eventTarget === window) ||
          // responder (or ancestors) blur
          (eventType === 'blur' &&
            (eventTarget as HTMLElement).contains(node) &&
            (domEvent as FocusEvent).relatedTarget !== node) ||
          // native scroll without using a pointer
          (isScroll(domEvent) && this.#trackedTouchCount === 0) ||
          // native scroll on node that is parent of the responder (allow siblings to scroll)
          (isScroll(domEvent) &&
            (eventTarget as HTMLElement).contains(node) &&
            eventTarget !== node) ||
          // native select/selectionchange on node
          (isSelectionChange(domEvent) && hasValidSelection(domEvent));

        const releaseEvent =
          isEndish(domEvent) &&
          !terminateEvent &&
          !hasTargetTouches(node, 'touches' in domEvent ? domEvent.touches : undefined);

        if (isEndish(domEvent)) {
          if (onResponderEnd != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderEnd';
            onResponderEnd(responderEvent);
          }
        }
        if (releaseEvent) {
          if (onResponderRelease != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderRelease';
            onResponderRelease(responderEvent);
          }
          this.#setResponder(emptyResponder);
        }
        if (terminateEvent) {
          let shouldTerminate = true;

          // Responders can still avoid termination but only for these events.
          if (eventType === 'contextmenu' || isSelectionChange(domEvent)) {
            // Only call this function is it wasn't already called during negotiation.
            if (negotiated) {
              shouldTerminate = false;
            } else if (onResponderTerminationRequest != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';
              if (onResponderTerminationRequest(responderEvent) === false) {
                shouldTerminate = false;
              }
            }
          }

          if (shouldTerminate) {
            if (onResponderTerminate != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
              onResponderTerminate(responderEvent);
            }
            this.#setResponder(emptyResponder);
            this.#emulatingMouseEvents = false;
            this.#trackedTouchCount = 0;
          }
        }
      }
    }
  };

  /**
   * Walk the event path to/from the target node. At each node, stop and call the
   * relevant "shouldSet" functions for the given event type. If any of those functions
   * call "stopPropagation" on the event, stop searching for a responder.
   */
  static #findWantsResponder(
    eventPaths: { idPath: number[]; nodePath: any[] },
    domEvent: Event,
    responderEvent: ResponderEvent,
  ) {
    const shouldSetCallbacks = shouldSetResponderEvents[domEvent.type];

    if (shouldSetCallbacks != null) {
      const { idPath, nodePath } = eventPaths;

      const shouldSetCallbackCaptureName = shouldSetCallbacks[0];
      const shouldSetCallbackBubbleName = shouldSetCallbacks[1];
      const { bubbles } = shouldSetCallbacks[2];

      const check = (id: number, node: any, callbackName: keyof ResponderConfig) => {
        const config = ResponderSystem.#getResponderConfig(id);
        const shouldSetCallback = config[callbackName];
        if (shouldSetCallback != null) {
          responderEvent.currentTarget = node;
          if (shouldSetCallback(responderEvent) === true) {
            // Start the path from the potential responder
            const prunedIdPath = idPath.slice(idPath.indexOf(id));
            return { id, node, idPath: prunedIdPath };
          }
        }
      };

      // Capture
      for (let i = idPath.length - 1; i >= 0; i--) {
        const id = idPath[i];
        const node = nodePath[i];
        const result = check(id, node, shouldSetCallbackCaptureName);
        if (result != null) {
          return result;
        }
        if (responderEvent.isPropagationStopped() === true) {
          return;
        }
      }

      // Bubble
      if (bubbles) {
        for (let i = 0; i < idPath.length; i++) {
          const id = idPath[i];
          const node = nodePath[i];
          const result = check(id, node, shouldSetCallbackBubbleName);
          if (result != null) {
            return result;
          }
          if (responderEvent.isPropagationStopped() === true) {
            return;
          }
        }
      } else {
        const id = idPath[0];
        const node = nodePath[0];
        const target = domEvent.target;
        if (target === node) {
          return check(id, node, shouldSetCallbackBubbleName);
        }
      }
    }
  }

  /**
   * Attempt to transfer the responder.
   */
  static #attemptTransfer(responderEvent: ResponderEvent, wantsResponder: ActiveResponderInstance) {
    const { id: currentId, node: currentNode } = ResponderSystem.#responder;
    const { id, node } = wantsResponder;

    const { onResponderGrant, onResponderReject } = ResponderSystem.#getResponderConfig(id);

    responderEvent.bubbles = false;
    responderEvent.cancelable = false;
    responderEvent.currentTarget = node;

    // Set responder
    if (currentId == null) {
      if (onResponderGrant != null) {
        responderEvent.currentTarget = node;
        responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
        onResponderGrant(responderEvent);
      }
      ResponderSystem.#setResponder(wantsResponder);
    }
    // Negotiate with current responder
    else {
      const { onResponderTerminate, onResponderTerminationRequest } =
        ResponderSystem.#getResponderConfig(currentId);

      let allowTransfer = true;
      if (onResponderTerminationRequest != null) {
        responderEvent.currentTarget = currentNode;
        responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';
        if (onResponderTerminationRequest(responderEvent) === false) {
          allowTransfer = false;
        }
      }

      if (allowTransfer) {
        // Terminate existing responder
        if (onResponderTerminate != null) {
          responderEvent.currentTarget = currentNode;
          responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
          onResponderTerminate(responderEvent);
        }
        // Grant next responder
        if (onResponderGrant != null) {
          responderEvent.currentTarget = node;
          responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
          onResponderGrant(responderEvent);
        }
        ResponderSystem.#setResponder(wantsResponder);
        // Reject responder request
      } else if (onResponderReject != null) {
        responderEvent.currentTarget = node;
        responderEvent.dispatchConfig.registrationName = 'onResponderReject';
        onResponderReject(responderEvent);
      }
    }
  }

  static attachListeners() {
    if (isClient && window.__reactResponderSystemActive == null) {
      window.addEventListener('blur', ResponderSystem.#eventListener);
      for (const eventType of documentEventsBubblePhase) {
        document.addEventListener(eventType, ResponderSystem.#eventListener);
      }
      for (const eventType of documentEventsCapturePhase) {
        document.addEventListener(eventType, ResponderSystem.#eventListener, true);
      }
      window.__reactResponderSystemActive = true;
    }
  }

  /**
   * Register a node with the ResponderSystem.
   */
  static addNode(id: number, node: any, config: ResponderConfig) {
    setResponderId(node, id);
    ResponderSystem.#responderListenersMap.set(id, config);
  }

  /**
   * Unregister a node with the ResponderSystem.
   */
  static removeNode(id: number) {
    if (ResponderSystem.#responder.id === id) {
      ResponderSystem.terminateResponder();
    }
    if (ResponderSystem.#responderListenersMap.has(id)) {
      ResponderSystem.#responderListenersMap.delete(id);
    }
  }

  /**
   * Allow the current responder to be terminated from within components to support
   * more complex requirements, such as use with other React libraries for working
   * with scroll views, input views, etc.
   */
  static terminateResponder() {
    const { id, node } = ResponderSystem.#responder;
    if (id != null && node != null) {
      const { onResponderTerminate } = ResponderSystem.#getResponderConfig(id);
      if (onResponderTerminate != null) {
        const event = createResponderEvent({}, ResponderSystem.#responderTouchHistoryStore);
        event.currentTarget = node;
        onResponderTerminate(event);
      }
      ResponderSystem.#setResponder(emptyResponder);
    }
    ResponderSystem.#emulatingMouseEvents = false;
    ResponderSystem.#trackedTouchCount = 0;
  }

  /**
   * Allow unit tests to inspect the current responder in the system.
   * FOR TESTING ONLY.
   */
  static getResponderNode() {
    return ResponderSystem.#responder.node;
  }
}
