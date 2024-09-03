'use client';

import type { SxProps } from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { TextMethods, TextProps } from '../Text';
import { Text } from '../Text';

export interface HeadingMethods extends TextMethods {}

export interface HeadingProps extends TextProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type HeadingType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<HeadingProps> & React.RefAttributes<HTMLHeadingElement & HeadingMethods>
>;

const HeadingRoot = styled(Text, {
  name: 'Heading',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.heading.family,
  fontWeight: 700,
}));

export const Heading = forwardRef<HTMLHeadingElement & HeadingMethods, HeadingProps>(
  (props, ref) => <HeadingRoot ref={ref} aria-level={2} role="heading" {...props} />,
) as HeadingType;

Heading.displayName = 'Heading';
