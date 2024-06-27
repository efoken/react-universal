import { normalizeLayoutEvent, normalizeRole, styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewProps, ScrollViewType } from './ScrollView.types';

const ScrollViewRoot = styled(RNScrollView, {
  name: 'ScrollView',
  slot: 'Root',
})({
  position: 'static',
});

export const ScrollView = forwardRef<any, ScrollViewProps>(
  ({ contentContainerStyle, onLayout, onWheel, refreshControl, role, style, ...props }, ref) => (
    <ScrollViewRoot
      ref={ref}
      contentContainerStyle={contentContainerStyle as any}
      refreshControl={refreshControl as any}
      role={normalizeRole(role)}
      style={style as any}
      onLayout={normalizeLayoutEvent(onLayout)}
      {...props}
    />
  ),
) as unknown as ScrollViewType;

ScrollView.displayName = 'ScrollView';
