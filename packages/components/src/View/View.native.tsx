import {
  normalizeLayoutEvent,
  normalizeMouseEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { View as UnistylesView } from 'react-native-unistyles/components/native/View';
import type { ViewProps } from './View.types';

const ViewRoot = styled(UnistylesView, {
  name: 'View',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  position: 'static',
}));

export const View: React.FC<ViewProps & { ref?: React.Ref<any> }> = ({
  lang,
  onClick,
  onClickCapture,
  onLayout,
  onMouseEnter,
  onMouseLeave,
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
  onScrollShouldSetResponder,
  onScrollShouldSetResponderCapture,
  onSelectionChangeShouldSetResponder,
  onSelectionChangeShouldSetResponderCapture,
  onStartShouldSetResponder,
  onStartShouldSetResponderCapture,
  onTouchCancel,
  onTouchEnd,
  onTouchEndCapture,
  onTouchMove,
  onTouchStart,
  role,
  style,
  ref,
  ...props
}) => (
  <ViewRoot
    accessibilityLanguage={lang}
    role={normalizeRole(role)}
    style={style as any}
    onClick={normalizeMouseEvent(onClick)}
    onClickCapture={normalizeMouseEvent(onClickCapture)}
    onLayout={normalizeLayoutEvent(onLayout)}
    onMouseEnter={onMouseEnter as any}
    onMouseLeave={onMouseLeave as any}
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
