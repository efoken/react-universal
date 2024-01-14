'use client';

import { OverridableComponent, SxProps, styled } from '@universal-ui/styles';
import { forwardRef } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native';

export interface ScrollViewProps extends RNScrollViewProps {
  sx?: SxProps;
}

const ScrollViewRoot = styled(RNScrollView)();

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  (props, ref) => <ScrollViewRoot ref={ref} {...props} />,
) as OverridableComponent<ScrollViewProps, typeof RNScrollView>;
