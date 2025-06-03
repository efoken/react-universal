'use client';

import type { BreakpointValue, RNStyle, SxProps, Theme, ThemeValue } from '@react-universal/core';
import { handleBreakpoints, styled, useOwnerState } from '@react-universal/core';
import { Children, cloneElement } from 'react';
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

export type StackType = React.FC<
  React.PropsWithoutRef<StackProps> & React.RefAttributes<HTMLElement & ViewMethods>
>;

type StackOwnerState = Required<Pick<StackProps, 'direction' | 'spacing'>>;

/**
 * Return an array with the divider React element interspersed between each
 * React node of the input children.
 *
 * @example
 * joinChildren([1, 2, 3], 0) // [1, 0, 2, 0, 3]
 */
function joinChildren(children: React.ReactNode, divider: React.ReactElement) {
  const _children = Children.toArray(children).filter(Boolean);

  return _children.reduce<React.ReactNode[]>((acc, child, index) => {
    acc.push(child);

    if (index < _children.length - 1) {
      // biome-ignore lint/suspicious/noArrayIndexKey: we don't have a better key
      acc.push(cloneElement(divider, { key: `separator-${index}` }));
    }

    return acc;
  }, []);
}

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
  variants: [
    {
      props: ({ direction }) => direction === 'row' || direction === 'row-reverse',
      style: {
        alignItems: 'center',
      },
    },
    {
      props: ({ direction }) => direction === 'column' || direction === 'column-reverse',
      style: {
        justifyContent: 'center',
      },
    },
  ],
}));

export const Stack: React.FC<StackProps & React.RefAttributes<HTMLElement & ViewMethods>> = ({
  children,
  direction = 'column',
  divider,
  spacing = 0,
  ...props
}) => {
  const ownerState = useOwnerState({
    direction,
    spacing,
  });

  return (
    <StackRoot ownerState={ownerState} {...props}>
      {divider ? joinChildren(children, divider) : children}
    </StackRoot>
  );
};

Stack.displayName = 'Stack';
