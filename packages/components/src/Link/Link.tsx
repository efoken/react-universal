'use client';

import { styled } from '@react-universal/core';
import { forwardRef } from 'react';
import type { TextMethods } from '../Text';
import { Text } from '../Text';
import type { LinkProps, LinkType } from './Link.types';

const LinkRoot = styled(Text, {
  name: 'Link',
  slot: 'Root',
})();

export const Link = forwardRef<HTMLAnchorElement & TextMethods, LinkProps>(
  ({ download, rel, target, ...props }: LinkProps, ref) => (
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
