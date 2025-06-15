import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { runIfFunction } from '@react-universal/utils';
import { useState } from 'react';
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { Pressable as RNPressable } from 'react-native';
import type { ButtonProps } from './Button.types';

const ButtonRoot = styled(RNPressable, {
  name: 'Button',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  borderWidth: 1,
  flexDirection: 'row',
  padding: 1,
}));

export const Button: React.FC<ButtonProps & { ref?: React.Ref<any> }> = ({
  children,
  disabled = false,
  lang,
  onBlur,
  onFocus,
  onFocusVisible,
  onLayout,
  onLongPress,
  onMoveShouldSetResponder,
  onMoveShouldSetResponderCapture,
  onPress,
  onPressIn,
  onPressOut,
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
}) => {
  const [focusVisible, setFocusVisible] = useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  const handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    setFocusVisible(false);
    onBlur?.(event);
  };

  const handleFocus = (event: NativeSyntheticEvent<TargetedEvent>) => {
    setFocusVisible(true);
    onFocus?.(event);
    onFocusVisible?.(event);
  };

  const _style = ({ pressed }: { pressed: boolean }) =>
    runIfFunction(style, { focusVisible, hovered: false, pressed }) as any;

  return (
    <ButtonRoot
      accessibilityLanguage={lang}
      disabled={disabled}
      role={normalizeRole(role) ?? 'button'}
      style={_style}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onLayout={normalizeLayoutEvent(onLayout)}
      onLongPress={normalizeResponderEvent(onLongPress)}
      onMoveShouldSetResponder={normalizeResponderEvent(onMoveShouldSetResponder)}
      onMoveShouldSetResponderCapture={normalizeResponderEvent(onMoveShouldSetResponderCapture)}
      onPress={normalizeResponderEvent(onPress)}
      onPressIn={normalizeResponderEvent(onPressIn)}
      onPressOut={normalizeResponderEvent(onPressOut)}
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
    >
      {({ pressed }) => runIfFunction(children, { focusVisible, hovered: false, pressed })}
    </ButtonRoot>
  );
};

Button.displayName = 'Button';
