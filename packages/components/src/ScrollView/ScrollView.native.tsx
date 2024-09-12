import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@universal-ui/core';
import { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewProps, ScrollViewType } from './ScrollView.types';

const ScrollViewRoot = styled(RNScrollView, {
  name: 'ScrollView',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  position: 'static',
}));

export const ScrollView = forwardRef<any, ScrollViewProps>(
  (
    {
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
      onWheel,
      refreshControl,
      role,
      style,
      ...props
    },
    ref,
  ) => (
    <ScrollViewRoot
      ref={ref}
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
      {...props}
    />
  ),
) as ScrollViewType;

ScrollView.displayName = 'ScrollView';
