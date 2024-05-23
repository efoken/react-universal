'use client';

import type {
  OverridableComponent,
  OverridableProps,
  SxProps,
} from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { Text } from '../Text';

export interface LinkOwnProps {
  /**
   * The URL to link to when the link is clicked.
   */
  href?: string;
  /**
   * Set link-related attributes.
   */
  hrefAttrs?: {
    download?: any;
    rel?: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type LinkProps<C extends React.ElementType = typeof Text> =
  OverridableProps<LinkOwnProps, C> & {
    as?: React.ElementType;
  };

const LinkRoot = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.body.family,
  fontStyle: 'normal',
  fontWeight: 'normal',
}));

export const Link = forwardRef<typeof Text, LinkProps>((props, ref) => (
  <LinkRoot ref={ref} role="link" {...props} />
)) as OverridableComponent<LinkOwnProps, typeof Text>;

Link.displayName = 'Link';
