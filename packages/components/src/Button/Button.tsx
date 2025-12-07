'use client';

import type { ResponderEvent } from '@react-universal/core';
import { styled, useOwnerState } from '@react-universal/core';
import { runIfFunction } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useRef, useState } from 'react';
import type {
  BlurEvent as RNBlurEvent,
  FocusEvent as RNFocusEvent,
  MouseEvent as RNMouseEvent,
} from 'react-native';
import { View } from '../View';
import type { ButtonMethods, ButtonOwnerState, ButtonProps } from './Button.types';

const ButtonRoot = styled(View, {
  name: 'Button',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx',
})<{
  disabled?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
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

export const Button: React.FC<ButtonProps & { ref?: React.Ref<HTMLElement & ButtonMethods> }> = ({
  as: _as,
  children,
  disabled = false,
  href,
  onBlur,
  onFocus,
  onFocusVisible,
  onHoverIn,
  onHoverOut,
  onKeyDown,
  onKeyUp,
  onPress,
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

  const handleMouseEnter = (event: RNMouseEvent) => {
    setHovered(true);
    onHoverIn?.(event);
  };

  const handleMouseLeave = (event: RNMouseEvent) => {
    if (focusVisible) {
      event.preventDefault();
    }
    onHoverOut?.(event);
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

  const isNativeButton = () =>
    hostRef.current?.tagName === 'BUTTON' ||
    (hostRef.current?.tagName === 'A' && (hostRef.current as HTMLAnchorElement).href);

  const handleClick = (event: ResponderEvent) => {
    if (!disabled) {
      onPress?.(event);
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setPressed(true);
      document.addEventListener(
        'mouseup',
        () => {
          setPressed(false);
        },
        { once: true },
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.target === event.currentTarget && !isNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
      setPressed(true);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      !isNativeButton() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      event.preventDefault();
      onPress?.(event as any);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0

    if (event.target === event.currentTarget) {
      setPressed(false);
    }

    onKeyUp?.(event);

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      !isNativeButton() &&
      !disabled &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      onPress?.(event as any);
    }
  };

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
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {runIfFunction(children, { focusVisible, hovered, pressed })}
    </ButtonRoot>
  );
};

Button.displayName = 'Button';
