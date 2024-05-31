'use client';

import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { LayoutChangeEvent as RNLayoutChangeEvent } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewMethods, ScrollViewProps } from './ScrollView.types';

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

const ScrollViewRoot = styled(RNScrollView, {
  name: 'ScrollView',
  slot: 'Root',
})({
  position: 'static',
});

export const ScrollView = forwardRef<any, ScrollViewProps>(
  ({ onLayout, onWheel, role, ...props }, ref) => {
    const handleLayout = (event: RNLayoutChangeEvent) => {
      onLayout?.(normalizeLayoutEvent(event));
    };

    return (
      <ScrollViewRoot
        ref={ref}
        role={role === 'listbox' || role === 'paragraph' ? undefined : role}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
) as unknown as React.FunctionComponent<ScrollViewProps & React.RefAttributes<ScrollViewMethods>> &
  ScrollViewMethods;

ScrollView.displayName = 'ScrollView';
