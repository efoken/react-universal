import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { NativeMethods, LayoutChangeEvent as RNLayoutChangeEvent } from 'react-native';
import { Text as RNText } from 'react-native';
import type { TextProps } from './Text.types';

function normalizeLayoutEvent(event: RNLayoutChangeEvent) {
  return {
    nativeEvent: {
      layout: {
        height: event.nativeEvent.layout.height,
        left: event.nativeEvent.layout.x,
        top: event.nativeEvent.layout.y,
        width: event.nativeEvent.layout.width,
        x: event.nativeEvent.layout.x,
        y: event.nativeEvent.layout.y,
      },
      target: event.target,
    },
    timeStamp: event.timeStamp,
  };
}

const TextRoot = styled(RNText, {
  name: 'Text',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.body.family,
  fontStyle: 'normal',
  fontWeight: 'normal',
  position: 'static',
}));

export const Text = forwardRef<any, TextProps>(
  ({ 'aria-hidden': ariaHidden, onLayout, role, style, ...props }, ref) => {
    const handleLayout = (event: RNLayoutChangeEvent) => {
      onLayout?.(normalizeLayoutEvent(event));
    };

    return (
      <TextRoot
        ref={ref}
        accessibilityElementsHidden={ariaHidden}
        aria-hidden={ariaHidden}
        importantForAccessibility={ariaHidden ? 'no-hide-descendants' : undefined}
        role={
          role === 'label' || role === 'listbox' || role === 'paragraph' || role === 'textbox'
            ? undefined
            : role
        }
        style={style as any}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
) as unknown as React.FunctionComponent<TextProps & React.RefAttributes<NativeMethods>> &
  NativeMethods;

Text.displayName = 'Text';
