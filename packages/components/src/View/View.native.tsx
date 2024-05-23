import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { LayoutChangeEvent, NativeMethods } from 'react-native';
import { View as RNView } from 'react-native';
import type { ViewProps } from './View.types';

function normalizeLayoutEvent(event: LayoutChangeEvent) {
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

const ViewRoot = styled(RNView, {
  label: 'ViewRoot',
})({
  position: 'static',
});

export const View = forwardRef<RNView, ViewProps>(
  ({ onLayout, role, ...props }, ref) => {
    const handleLayout = (event: LayoutChangeEvent) => {
      onLayout?.(normalizeLayoutEvent(event));
    };

    return (
      <ViewRoot
        ref={ref}
        role={role === 'listbox' || role === 'paragraph' ? undefined : role}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
) as unknown as React.ComponentType<
  ViewProps & React.RefAttributes<NativeMethods>
> &
  NativeMethods;

View.displayName = 'View';
