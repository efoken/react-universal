'use client';

import { styled, useOwnerState, usePressEvents } from '@react-universal/core';
import { composeEventHandlers, runIfFunction } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useRef, useState } from 'react';
import type { BlurEvent as RNBlurEvent, FocusEvent as RNFocusEvent } from 'react-native';
import { View } from '../View';
import type { ButtonOwnerState, ButtonProps } from './Button.types';

const ButtonRoot = styled(View, {
  name: 'Button',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx',
})<{
  disabled?: boolean;
  ownerState: ButtonOwnerState;
  type?: 'button' | 'submit' | 'reset';
}>({
  borderWidth: 1,
  flexDirection: 'row',
  padding: 1,
  variants: {
    disabled: {
      true: {
        pointerEvents: 'box-none',
      },
      false: {
        cursor: 'pointer',
        touchAction: 'manipulation',
      },
    },
  },
});

export const Button: React.FC<ButtonProps & { ref?: React.Ref<HTMLElement> }> = ({
  as: _as,
  children,
  delayLongPress,
  disabled = false,
  href,
  onBlur,
  onClick,
  onResponderTerminationRequest,
  onContextMenu,
  onFocus,
  onFocusVisible,
  onResponderTerminate,
  onResponderMove,
  onStartShouldSetResponder,
  onMouseEnter,
  onMouseLeave,
  onHoverIn,
  onHoverOut,
  onKeyDown,
  onLongPress,
  onPress,
  onPressIn,
  onPressMove,
  onResponderRelease,
  onPressOut,
  onResponderGrant,
  ref,
  style,
  tabIndex,
  type,
  ...props
}) => {
  const hostRef = useRef<HTMLElement>(null);

  const [hovered, setHovered] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const [focusVisible, setFocusVisible] = useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHovered(true);
    onHoverIn?.(event);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (focusVisible) {
      event.preventDefault();
    }
    onHoverOut?.(event);
    onMouseLeave?.(event);
  };

  const handleBlur = (event: RNBlurEvent) => {
    if (event.target instanceof HTMLElement && !event.target.matches(':focus-visible')) {
      setFocusVisible(false);
    }
    onBlur?.(event);
  };

  const handleFocus = (event: RNFocusEvent) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!hostRef.current) {
      // @ts-expect-error: `currentTarget` is always of type `HTMLElement`
      hostRef.current = event.currentTarget;
    }

    if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) {
      setFocusVisible(true);
      onFocusVisible?.(event);
    }

    onFocus?.(event);
  };

  const pressEventHandlers = usePressEvents(hostRef, {
    delayLongPress,
    disabled,
    onLongPress,
    onPress,
    onPressChange: setPressed,
    onPressIn,
    onPressMove,
    onPressOut,
  });

  const handleRef = useComposedRefs<any>(hostRef, ref);

  const ownerState = useOwnerState({
    disabled,
  });

  return (
    <ButtonRoot
      ref={handleRef}
      aria-disabled={href == null ? undefined : disabled}
      as={_as ?? (href == null ? 'button' : 'a')}
      disabled={href == null ? disabled : undefined}
      href={href}
      ownerState={ownerState}
      role="button"
      tabIndex={href == null ? tabIndex : disabled ? -1 : (tabIndex ?? 0)}
      style={runIfFunction(style, { focusVisible, hovered, pressed })}
      type={href == null ? (type ?? 'button') : undefined}
      onBlur={handleBlur}
      onClick={composeEventHandlers(pressEventHandlers.onClick, onClick)}
      onContextMenu={composeEventHandlers(pressEventHandlers.onContextMenu, onContextMenu)}
      onFocus={handleFocus}
      onKeyDown={composeEventHandlers(pressEventHandlers.onKeyDown, onKeyDown)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onResponderGrant={composeEventHandlers(pressEventHandlers.onResponderGrant, onResponderGrant)}
      onResponderMove={composeEventHandlers(pressEventHandlers.onResponderMove, onResponderMove)}
      onResponderRelease={composeEventHandlers(
        pressEventHandlers.onResponderRelease,
        onResponderRelease,
      )}
      onResponderTerminate={composeEventHandlers(
        pressEventHandlers.onResponderTerminate,
        onResponderTerminate,
      )}
      onResponderTerminationRequest={composeEventHandlers(
        pressEventHandlers.onResponderTerminationRequest,
        onResponderTerminationRequest,
      )}
      onStartShouldSetResponder={composeEventHandlers(
        pressEventHandlers.onStartShouldSetResponder,
        onStartShouldSetResponder,
      )}
      {...props}
    >
      {runIfFunction(children, { focusVisible, hovered, pressed })}
    </ButtonRoot>
  );
};

Button.displayName = 'Button';
