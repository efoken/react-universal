'use client';

import { clamp, max, styled, useOwnerState } from '@react-universal/core';
import type { Breakpoint } from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import { forwardRef } from 'react';
import { View } from '../View';
import type {
  ContainerMethods,
  ContainerOwnerState,
  ContainerProps,
  ContainerType,
} from './Container.types';

const MIN_WIDTH = '20rem';
const MAX_WIDTH = '79.75rem';

const ContainerRoot = styled(View)<{ ownerState: ContainerOwnerState }>(({ runtime, theme }) => ({
  marginInline: 'auto',
  paddingInline: {
    xs: max(theme.space[4], runtime.insets.left, runtime.insets.right),
    sm: max(theme.space[6], runtime.insets.left, runtime.insets.right),
    md: max(theme.space[7], runtime.insets.left, runtime.insets.right),
  },
  width: '100%',
  variants: [
    ...(Object.entries(theme.breakpoints) as [Breakpoint, number][]).map(
      ([breakpoint, maxWidth]) => ({
        props: { maxWidth: breakpoint },
        style: {
          maxWidth: {
            [breakpoint]: clamp(MIN_WIDTH, maxWidth, MAX_WIDTH),
          },
        },
      }),
    ),
    {
      props: { fixed: true },
      style: {
        maxWidth: Object.entries(theme.breakpoints).reduce<AnyObject>(
          (acc, [breakpoint, maxWidth]) => {
            acc[breakpoint] = clamp(MIN_WIDTH, maxWidth, MAX_WIDTH);
            return acc;
          },
          {},
        ),
        minWidth: 0,
      },
    },
  ],
}));

export const Container = forwardRef<HTMLElement & ContainerMethods, ContainerProps>(
  ({ fixed = false, maxWidth = false, ...props }, ref) => {
    const ownerState = useOwnerState({
      fixed,
      maxWidth,
    });

    return <ContainerRoot ref={ref} ownerState={ownerState} {...props} />;
  },
) as ContainerType;

Container.displayName = 'Container';
