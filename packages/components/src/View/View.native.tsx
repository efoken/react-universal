import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { View as RNView } from 'react-native';
import type { ViewProps } from './View.types';

const ViewRoot = styled(RNView, {
  name: 'View',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  position: 'static',
}));

export const View: React.FC<ViewProps & { ref?: React.Ref<any> }> = ({
  lang,
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
  onTouchCancel,
  onTouchEnd,
  onTouchEndCapture,
  onTouchMove,
  onTouchStart,
  role,
  style,
  ...props
}) => (
  <ViewRoot
    accessibilityLanguage={lang}
    role={normalizeRole(role)}
    style={style as any}
    onLayout={normalizeLayoutEvent(onLayout)}
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
    onTouchCancel={normalizeResponderEvent(onTouchCancel)}
    onTouchEnd={normalizeResponderEvent(onTouchEnd)}
    onTouchEndCapture={normalizeResponderEvent(onTouchEndCapture)}
    onTouchMove={normalizeResponderEvent(onTouchMove)}
    onTouchStart={normalizeResponderEvent(onTouchStart)}
    {...props}
  />
);

View.displayName = 'View';
