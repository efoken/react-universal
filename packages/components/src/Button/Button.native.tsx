import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@universal-ui/core';
import { isFunction } from '@universal-ui/utils';
import { forwardRef, useState } from 'react';
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { Pressable as RNPressable } from 'react-native';
import type { ButtonProps, ButtonType } from './Button.types';

const ButtonRoot = styled(RNPressable, {
  name: 'Button',
  slot: 'Root',
})(() => ({
  borderWidth: 1,
  flexDirection: 'row',
  padding: 1,
}));

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      disabled = false,
      lang,
      onBlur,
      onFocus,
      onFocusVisible,
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
  ) => {
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
      isFunction(style)
        ? (style({ focusVisible, hovered: false, pressed }) as any)
        : (style as any);

    return (
      <ButtonRoot
        ref={ref}
        accessibilityLanguage={lang}
        disabled={disabled}
        role={normalizeRole(role) ?? 'button'}
        style={_style}
        onBlur={handleBlur}
        onFocus={handleFocus}
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
      >
        {({ pressed }) =>
          isFunction(children) ? children({ focusVisible, hovered: false, pressed }) : children
        }
      </ButtonRoot>
    );
  },
) as unknown as ButtonType;

Button.displayName = 'Button';
