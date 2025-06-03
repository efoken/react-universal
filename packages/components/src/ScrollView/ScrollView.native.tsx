import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewProps } from './ScrollView.types';

const ScrollViewRoot = styled(RNScrollView, {
  name: 'ScrollView',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  position: 'static',
}));

export const ScrollView: React.FC<ScrollViewProps & React.RefAttributes<any>> = ({
  contentContainerStyle,
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
  onWheel,
  refreshControl,
  role,
  style,
  ...props
}) => (
  <ScrollViewRoot
    accessibilityLanguage={lang}
    contentContainerStyle={contentContainerStyle as any}
    refreshControl={refreshControl as any}
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

ScrollView.displayName = 'ScrollView';
