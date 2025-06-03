'use client';

import type { SxProps } from '@react-universal/core';
import { styled } from '@react-universal/core';
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

export type HeadingType = React.FC<
  React.PropsWithoutRef<HeadingProps> & React.RefAttributes<HTMLHeadingElement & HeadingMethods>
>;

const HeadingRoot = styled(Text, {
  name: 'Heading',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.heading,
  fontWeight: 700,
}));

export const Heading: React.FC<
  HeadingProps & React.RefAttributes<HTMLHeadingElement & HeadingMethods>
> = (props) => <HeadingRoot aria-level={2} role="heading" {...props} />;

Heading.displayName = 'Heading';
