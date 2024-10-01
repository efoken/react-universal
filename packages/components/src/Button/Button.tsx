'use client';

import { styled, useOwnerState } from '@react-universal/core';
import { normalizeEvent, runIfFunction } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { forwardRef, useRef, useState } from 'react';
import { View } from '../View';
import type { ButtonMethods, ButtonOwnerState, ButtonProps, ButtonType } from './Button.types';

const ButtonRoot = styled(View, {
  name: 'Button',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx',
})<{
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  ownerState: ButtonOwnerState;
  type?: 'button' | 'submit' | 'reset';
}>(({ ownerState }) => ({
  borderWidth: 1,
  flexDirection: 'row',
  padding: 1,
  ...(ownerState.disabled
    ? {
        pointerEvents: 'box-none',
      }
    : {
        cursor: 'pointer',
        touchAction: 'manipulation',
      }),
}));

export const Button = forwardRef<HTMLElement & ButtonMethods, ButtonProps>(
  (
    {
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
      style,
      tabIndex,
      type,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const hostRef = useRef<HTMLElement>();

    const [hovered, setHovered] = useState<boolean>(false);
    const [pressed, setPressed] = useState<boolean>(false);

    const [focusVisible, setFocusVisible] = useState(false);
    if (disabled && focusVisible) {
      setFocusVisible(false);
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      setHovered(true);
      onHoverIn?.(normalizeEvent(event));
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
      if (focusVisible) {
        event.preventDefault();
      }
      onHoverOut?.(normalizeEvent(event));
    };

    const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
      if (!event.target.matches(':focus-visible')) {
        setFocusVisible(false);
      }
      onBlur?.(normalizeEvent(event));
    };

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!hostRef.current) {
        hostRef.current = event.currentTarget;
      }

      if (event.target.matches(':focus-visible')) {
        setFocusVisible(true);
        onFocusVisible?.(normalizeEvent(event));
      }

      onFocus?.(normalizeEvent(event));
    };

    const isNativeButton = () =>
      hostRef.current?.tagName === 'BUTTON' ||
      (hostRef.current?.tagName === 'A' && (hostRef.current as HTMLAnchorElement).href);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onPress?.(normalizeEvent(event));
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
        onPress?.(normalizeEvent(event));
        event.preventDefault();
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
        onPress?.(normalizeEvent(event));
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
  },
) as ButtonType;

Button.displayName = 'Button';
