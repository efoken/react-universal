'use client';

import type { BreakpointValue, RNStyle, SxProps, Theme, ThemeValue } from '@react-universal/core';
import { handleBreakpoints, styled, useOwnerState } from '@react-universal/core';
import { Children, cloneElement, forwardRef } from 'react';
import type { ViewMethods, ViewProps } from '../View';
import { View } from '../View';

export interface StackProps extends ViewProps {
  /**
   * Defines the `flex-direction` style property. It is applied for all screen
   * sizes by default.
   * @default 'column'
   */
  direction?: BreakpointValue<RNStyle['flexDirection']>;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactElement;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: BreakpointValue<number | ThemeValue<Theme['space']>>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type StackType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<StackProps> & React.RefAttributes<HTMLElement & ViewMethods>
>;

type StackOwnerState = Required<Pick<StackProps, 'direction' | 'spacing'>>;

/**
 * Return an array with the divider React element interspersed between each
 * React node of the input children.
 */
function joinChildren(children: React.ReactNode, divider: React.ReactElement) {
  const _children = Children.toArray(children).filter(Boolean);

  return _children.reduce<React.ReactNode[]>((acc, child, index) => {
    acc.push(child);

    if (index < _children.length - 1) {
      acc.push(cloneElement(divider, { key: `separator-${index}` }));
    }

    return acc;
  }, []);
}

// function getGapFromDirection(
//   direction: 'row' | 'row-reverse' | 'column' | 'column-reverse',
// ) {
//   return direction.startsWith('row') ? 'rowGap' : 'columnGap';
// }

const StackRoot = styled(View, {
  name: 'Stack',
  slot: 'Root',
})<{ ownerState: StackOwnerState }>(({ ownerState, theme }) => ({
  ...handleBreakpoints(
    { theme },
    ownerState.direction,
    (propValue: 'row' | 'row-reverse' | 'column' | 'column-reverse') => ({
      flexDirection: propValue,
    }),
  ),
  ...handleBreakpoints({ theme }, ownerState.spacing, (propValue: number) => ({
    // @ts-expect-error: It's fine as we check if `propValue` exists in space.
    gap: theme.space[propValue] ?? propValue,
  })),
}));

export const Stack = forwardRef<HTMLElement & ViewMethods, StackProps>(
  ({ children, direction = 'column', divider, spacing = 0, ...props }, ref) => {
    const ownerState = useOwnerState({
      direction,
      spacing,
    });

    return (
      <StackRoot ref={ref} ownerState={ownerState} {...props}>
        {divider ? joinChildren(children, divider) : children}
      </StackRoot>
    );
  },
) as StackType;

Stack.displayName = 'Stack';
