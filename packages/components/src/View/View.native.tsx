import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@universal-ui/core';
import { forwardRef } from 'react';
import { View as RNView } from 'react-native';
import type { ViewProps, ViewType } from './View.types';

const ViewRoot = styled(RNView, {
  name: 'View',
  slot: 'Root',
})({
  position: 'static',
});

export const View = forwardRef<any, ViewProps>(
  (
    {
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      role,
      style,
      ...props
    },
    ref,
  ) => (
    <ViewRoot
      ref={ref}
      role={normalizeRole(role)}
      style={style as any}
      onMoveShouldSetResponder={normalizeResponderEvent(onMoveShouldSetResponder)}
      onMoveShouldSetResponderCapture={normalizeResponderEvent(onMoveShouldSetResponderCapture)}
      onResponderEnd={normalizeResponderEvent(onResponderEnd)}
      onResponderGrant={normalizeResponderEvent(onResponderGrant)}
      onResponderMove={normalizeResponderEvent(onResponderMove)}
      onResponderReject={normalizeResponderEvent(onResponderReject)}
      onResponderRelease={normalizeResponderEvent(onResponderRelease)}
      onResponderStart={normalizeResponderEvent(onResponderStart)}
      onResponderTerminate={normalizeResponderEvent(onResponderTerminate)}
      onResponderTerminationRequest={normalizeResponderEvent(onResponderTerminationRequest)}
      onStartShouldSetResponder={normalizeResponderEvent(onStartShouldSetResponder)}
      onStartShouldSetResponderCapture={normalizeResponderEvent(onStartShouldSetResponderCapture)}
      onLayout={normalizeLayoutEvent(onLayout)}
      {...props}
    />
  ),
) as unknown as ViewType;

View.displayName = 'View';
