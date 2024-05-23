import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { LayoutChangeEvent, NativeMethods } from 'react-native';
import { Text as RNText } from 'react-native';
import type { TextProps } from './Text.types';

const TextRoot = styled(RNText, {
  label: 'Text',
})(({ theme }) => ({
  fontFamily: theme.fonts.body.family,
  fontStyle: 'normal',
  fontWeight: 'normal',
  position: 'static',
}));

export const Text = forwardRef<RNText, TextProps>(
  ({ 'aria-hidden': ariaHidden, onLayout, role, ...props }, ref) => {
    const handleLayout = (event: LayoutChangeEvent) => {
      onLayout?.({
        nativeEvent: {
          layout: {
            ...event.nativeEvent.layout,
            left: event.nativeEvent.layout.x,
            top: event.nativeEvent.layout.y,
          },
          target: event.target,
        },
        timeStamp: event.timeStamp,
      });
    };

    return (
      <TextRoot
        ref={ref}
        accessibilityElementsHidden={ariaHidden}
        aria-hidden={ariaHidden}
        importantForAccessibility={
          ariaHidden ? 'no-hide-descendants' : undefined
        }
        role={role === 'listbox' || role === 'paragraph' ? undefined : role}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
) as unknown as React.ComponentType<
  TextProps & React.RefAttributes<NativeMethods>
> &
  NativeMethods;

Text.displayName = 'Text';
