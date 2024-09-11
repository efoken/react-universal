'use client';

import { clamp, max, min, styled, useOwnerState } from '@universal-ui/core';
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

const ContainerRoot = styled(View)<{ ownerState: ContainerOwnerState }>(
  ({ runtime, theme }) => ({
    marginInline: 'auto',
    paddingInline: {
      xs: max(theme.space[4], runtime.insets.left, runtime.insets.right),
      sm: max(theme.space[6], runtime.insets.left, runtime.insets.right),
      md: max(theme.space[7], runtime.insets.left, runtime.insets.right),
    },
    width: '100%',
  }),
  ({ ownerState, theme }) => {
    if (!ownerState.maxWidth) {
      return {};
    }
    const maxWidth =
      ownerState.maxWidth === 'xs'
        ? max(theme.breakpoints.xs, MIN_WIDTH)
        : min(theme.breakpoints[ownerState.maxWidth], MAX_WIDTH);
    return {
      maxWidth: { [ownerState.maxWidth]: maxWidth },
    };
  },
  ({ ownerState, theme }) =>
    ownerState.fixed && {
      maxWidth: Object.entries(theme.breakpoints).reduce<Record<string, any>>(
        (acc, [breakpoint, maxWidth]) => {
          acc[breakpoint] = clamp(MIN_WIDTH, maxWidth, MAX_WIDTH);
          return acc;
        },
        {},
      ),
      minWidth: 0,
    },
);

export const Container = forwardRef<HTMLElement & ContainerMethods, ContainerProps>(
  ({ fixed = false, maxWidth = 'lg', ...props }, ref) => {
    const ownerState = useOwnerState({
      fixed,
      maxWidth,
    });

    return <ContainerRoot ref={ref} ownerState={ownerState} {...props} />;
  },
) as ContainerType;

Container.displayName = 'Container';
