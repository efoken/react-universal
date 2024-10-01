'use client';

import type { SxProps } from '@react-universal/core';
import { styled } from '@react-universal/core';
import { forwardRef } from 'react';
import type { TextMethods, TextProps } from '../Text';
import { Text } from '../Text';

export interface LinkProps extends Omit<TextProps, 'hrefAttrs'> {
  download?: any;
  /**
   * The URL to link to when the link is clicked.
   */
  href?: string;
  rel?: string;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
  target?: React.HTMLAttributeAnchorTarget;
}

export type LinkType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement & TextMethods>
>;

const LinkRoot = styled(Text, {
  name: 'Link',
  slot: 'Root',
})();

export const Link = forwardRef<HTMLAnchorElement & TextMethods, LinkProps>(
  ({ download, rel, target, ...props }, ref) => (
    <LinkRoot
      ref={ref}
      hrefAttrs={{
        download,
        rel,
        target,
      }}
      role="link"
      {...props}
    />
  ),
) as LinkType;

Link.displayName = 'Link';
