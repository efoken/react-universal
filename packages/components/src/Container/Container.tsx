'use client';

import type {
  Breakpoint,
  OverridableComponent,
  OverridableProps,
  SxProps,
} from '@universal-ui/core';
import { clamp, max, min, styled, useOwnerState } from '@universal-ui/core';
import { forwardRef } from 'react';
import { View } from '../View';

const MIN_WIDTH = 320;
const MAX_WIDTH = 1276;

export interface ContainerOwnProps {
  children?: React.ReactNode;
  /**
   * Set the max-width to match the min-width of the current breakpoint. This is
   * useful if you'd prefer to design for a fixed set of sizes instead of trying
   * to accommodate a fully fluid viewport. It's fluid by default.
   * @default false
   */
  fixed?: boolean;
  /**
   * Determine the max-width of the container. The container width grows with
   * the size of the screen. Set to `false` to disable max-width.
   * @default 'lg'
   */
  maxWidth?: Breakpoint | false;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ContainerProps<C extends React.ElementType = typeof View> =
  OverridableProps<ContainerOwnProps, C> & {
    as?: React.ElementType;
  };

type ContainerOwnerState = Required<Pick<ContainerProps, 'fixed' | 'maxWidth'>>;

const ContainerRoot = styled(View)<{ ownerState: ContainerOwnerState }>(
  ({ runtime, theme }) => {
    const paddingInline = {
      xs: max(theme.space[4], runtime.insets.left, runtime.insets.right) as any,
      sm: max(theme.space[6], runtime.insets.left, runtime.insets.right) as any,
      md: max(theme.space[7], runtime.insets.left, runtime.insets.right) as any,
    };
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

export const Container = forwardRef<any, ContainerProps>(
  ({ fixed = false, maxWidth = 'lg', ...props }, ref) => {
    const ownerState = useOwnerState({
      fixed,
      maxWidth,
    });

    return <ContainerRoot ref={ref} ownerState={ownerState} {...props} />;
  },
) as OverridableComponent<ContainerOwnProps, typeof View>;

Container.displayName = 'Container';
