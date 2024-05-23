'use client';

import type { OverridableComponent } from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import type { ScrollViewProps } from './ScrollView.types';

const ScrollViewRoot = styled(RNScrollView, {
  label: 'ScrollViewRoot',
})({
  position: 'static',
});

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  ({ onWheel, ...props }, ref) => <ScrollViewRoot ref={ref} {...props} />,
) as OverridableComponent<ScrollViewProps, typeof RNScrollView>;

ScrollView.displayName = 'ScrollView';
