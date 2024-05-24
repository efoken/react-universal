import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { LayoutChangeEvent as RNLayoutChangeEvent } from 'react-native';
import { View as RNView } from 'react-native';
import type { ViewMethods, ViewProps } from './View.types';

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

const ViewRoot = styled(RNView, {
  name: 'View',
  slot: 'Root',
})({
  position: 'static',
});

export const View = forwardRef<any, ViewProps>(
  ({ onLayout, role, ...props }, ref) => {
    const handleLayout = (event: RNLayoutChangeEvent) => {
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
) as unknown as React.FunctionComponent<
  ViewProps & React.RefAttributes<ViewMethods>
> &
  ViewMethods;

View.displayName = 'View';
