'use client';

import type {
  OverridableComponent,
  OverridableProps,
  SxProps,
} from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

export interface ScrollViewOwnProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ScrollViewProps<C extends React.ElementType = typeof RNScrollView> =
  OverridableProps<ScrollViewOwnProps, C> & {
    as?: React.ElementType;
  };

const ScrollViewRoot = styled(RNScrollView)();

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  (props, ref) => <ScrollViewRoot ref={ref} {...props} />,
) as OverridableComponent<ScrollViewOwnProps, typeof RNScrollView>;

ScrollView.displayName = 'ScrollView';
