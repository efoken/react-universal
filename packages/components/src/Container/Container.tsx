'use client';

import { clamp, max, styled, useOwnerState } from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import { View } from '../View';
import type { ContainerMethods, ContainerOwnerState, ContainerProps } from './Container.types';

const MIN_WIDTH = '20rem';
const MAX_WIDTH = '90rem';

const ContainerRoot = styled(View, {
  name: 'Container',
  slot: 'Root',
})<{ ownerState: ContainerOwnerState }>(({ runtime, theme }) => ({
  marginInline: 'auto',
  paddingInline: {
    xs: max(theme.space[4], runtime.insets.left, runtime.insets.right),
    sm: max(theme.space[6], runtime.insets.left, runtime.insets.right),
    md: max(theme.space[7], runtime.insets.left, runtime.insets.right),
  },
  width: '100%',
  variants: {
    maxWidth: Object.entries(theme.breakpoints).reduce<AnyObject>((acc, [breakpoint, maxWidth]) => {
      acc[breakpoint] = {
        maxWidth: {
          [breakpoint]: clamp(MIN_WIDTH, maxWidth, MAX_WIDTH),
        },
      };
      return acc;
    }, {}),
    fixed: {
      true: {
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
  },
}));

export const Container: React.FC<
  ContainerProps & { ref?: React.Ref<HTMLElement & ContainerMethods> }
> = ({ fixed = false, maxWidth = false, ...props }) => {
  const ownerState = useOwnerState({
    fixed,
    maxWidth,
  });

  return <ContainerRoot ownerState={ownerState} {...props} />;
};

Container.displayName = 'Container';
