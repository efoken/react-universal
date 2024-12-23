'use client';

import type { TextStyle } from '@react-universal/components';
import { css, styled } from '@react-universal/core';
import type { StyleProp, SxProps } from '@react-universal/core';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof NextLinkProps | 'className' | 'style'
    >,
    NextLinkProps {
  style?: StyleProp<TextStyle>;
  sx?: SxProps;
}

export const Link = styled(
  ({ className, style, ...props }: NextLinkProps & { className?: string; style?: any }) => (
    <NextLink {...css.props(style)} {...props} />
  ),
  {
    name: 'Link',
    slot: 'Root',
    // We need to allow the `as` prop to be forwarded to the root element
    shouldForwardProp: (prop) => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx',
  },
)() as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement>
>;