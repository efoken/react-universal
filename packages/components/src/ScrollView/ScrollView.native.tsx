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
  ({ contentContainerStyle, onLayout, onWheel, refreshControl, role, style, ...props }, ref) => {
    const handleLayout = (event: RNLayoutChangeEvent) => {
      onLayout?.(normalizeLayoutEvent(event));
    };

    return (
      <ScrollViewRoot
        ref={ref}
        contentContainerStyle={contentContainerStyle as any}
        refreshControl={refreshControl as any}
        role={role === 'label' || role === 'listbox' || role === 'paragraph' ? undefined : role}
        style={style as any}
        onLayout={handleLayout}
        {...props}
      />
    );
  },
) as unknown as React.FunctionComponent<ScrollViewProps & React.RefAttributes<ScrollViewMethods>> &
  ScrollViewMethods;

ScrollView.displayName = 'ScrollView';
