'use client';

import type { SxProps } from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { TextMethods, TextProps } from '../Text';
import { Text } from '../Text';

export interface LinkProps extends TextProps {
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

export type LinkType = React.FC<LinkProps & React.RefAttributes<TextMethods>> & TextMethods;

const LinkRoot = styled(Text, {
  name: 'Link',
  slot: 'Root',
})();

export const Link = forwardRef<TextMethods, LinkProps>((props, ref) => (
  <LinkRoot ref={ref} role="link" {...props} />
)) as unknown as LinkType;

Link.displayName = 'Link';
