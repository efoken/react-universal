'use client';

import { OverridableComponent, SxProps, styled } from '@universal-ui/styles';
import { forwardRef, useMemo } from 'react';
import { View as RNView, ViewProps as RNViewProps } from 'react-native';

const MIN_WIDTH = 320;
const MAX_WIDTH = 1276;

export interface ContainerProps extends RNViewProps {
  children?: React.ReactNode;
  /** @default false */
  fixed?: boolean;
  /** @default 'lg' */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | false;
  sx?: SxProps;
}

type ContainerOwnerState = Pick<ContainerProps, 'fixed' | 'maxWidth'>;

const ContainerRoot = styled(RNView)<{ ownerState: ContainerOwnerState }>(
  ({ runtime, theme }) => {
    const paddingInline =
      Math.max(runtime.insets.left, runtime.insets.right) > 0
        ? Math.max(runtime.insets.left, runtime.insets.right)
        : { xs: theme.space[4], sm: theme.space[6], md: theme.space[7] };
    return {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: paddingInline,
      paddingRight: paddingInline,
      width: '100%',
    };
  },
  ({ ownerState, theme }) => {
    if (!ownerState.maxWidth) {
      return {};
    }
    const maxWidth =
      ownerState.maxWidth === 'xs'
        ? Math.max(theme.breakpoints.xs, MIN_WIDTH)
        : Math.min(theme.breakpoints[ownerState.maxWidth], MAX_WIDTH);
    return {
      maxWidth: { [ownerState.maxWidth]: maxWidth },
    };
  },
  ({ ownerState, theme }) =>
    ownerState.fixed && {
      maxWidth: Object.entries(theme.breakpoints).reduce<Record<string, any>>(
        (acc, [breakpoint, maxWidth]) => {
          acc[breakpoint] = Math.min(Math.max(maxWidth, MIN_WIDTH), MAX_WIDTH);
          return acc;
        },
        {},
      ),
      minWidth: 0,
    },
);

export const Container = forwardRef<RNView, ContainerProps>(
  ({ fixed = false, maxWidth = 'lg', ...props }, ref) => {
    const ownerState = useMemo(
      () => ({
        fixed,
        maxWidth,
      }),
      [fixed, maxWidth],
    );

    return <ContainerRoot ref={ref} ownerState={ownerState} {...props} />;
  },
) as OverridableComponent<ContainerProps, typeof RNView>;
