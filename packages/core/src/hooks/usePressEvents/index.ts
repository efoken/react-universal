'use client';

import { useDebugValue, useEffect, useState } from 'react';
import type { PressResponderConfig } from './PressResponder';
import { PressResponder } from './PressResponder';

export function usePressEvents(_hostRef: any, config: PressResponderConfig) {
  const [pressResponder] = useState<PressResponder>(() => new PressResponder(config));

  // Re-configure to use the current node and configuration
  useEffect(() => {
    pressResponder.reconfigure(config);
  }, [config, pressResponder]);

  // Reset the `pressResponder` when cleanup needs to occur. This is a separate
  // effect because we do not want to rest the responder when `config` changes.
  useEffect(
    () => () => {
      pressResponder.reset();
    },
    [pressResponder],
  );

  useDebugValue(config);

  return pressResponder.getEventHandlers();
}
