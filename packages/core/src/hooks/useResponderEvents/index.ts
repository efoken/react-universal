'use client';

import { useDebugValue, useEffect, useRef } from 'react';
import { useConst } from '../useConst';
import type { ResponderConfig } from './ResponderSystem';
import { ResponderSystem } from './ResponderSystem';

export type { ResponderEvent } from './createResponderEvent';
export type { ResponderConfig } from './ResponderSystem';

let idCounter = 0;

/**
 * Hook for integrating the Responder System into React
 *
 * @example
 * function SomeComponent({ onStartShouldSetResponder }) {
 *   const ref = useRef(null);
 *   useResponderEvents(ref, { onStartShouldSetResponder });
 *   return <div ref={ref} />
 * }
 */
export function useResponderEvents(hostRef: any, config: ResponderConfig = {}) {
  const id = useConst(() => idCounter++);
  const attachedRef = useRef(false);

  // This is a separate effects so it doesn't run when the config changes.
  // On initial mount, attach global listeners if needed.
  // On unmount, remove node potentially attached to the Responder System.
  useEffect(() => {
    ResponderSystem.attachListeners();
    return () => {
      ResponderSystem.removeNode(id);
    };
  }, [id]);

  // Register and unregister with the Responder System as necessary
  useEffect(() => {
    const {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
    } = config;

    const requiresResponderSystem =
      onMoveShouldSetResponder != null ||
      onMoveShouldSetResponderCapture != null ||
      onScrollShouldSetResponder != null ||
      onScrollShouldSetResponderCapture != null ||
      onSelectionChangeShouldSetResponder != null ||
      onSelectionChangeShouldSetResponderCapture != null ||
      onStartShouldSetResponder != null ||
      onStartShouldSetResponderCapture != null;

    const node = hostRef.current;

    if (requiresResponderSystem) {
      ResponderSystem.addNode(id, node, config);
      attachedRef.current = true;
    } else if (attachedRef.current) {
      ResponderSystem.removeNode(id);
      attachedRef.current = false;
    }
  }, [config, hostRef, id]);

  useDebugValue({
    responder: hostRef.current === ResponderSystem.getResponderNode(),
  });
  useDebugValue(config);
}
