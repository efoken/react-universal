'use client';

import { styled } from '@react-universal/core';
import { Text } from '../Text';
import type { LinkProps } from './Link.types';

const LinkRoot = styled(Text, {
  name: 'Link',
  slot: 'Root',
})();

export const Link: React.FC<LinkProps & { ref?: React.Ref<HTMLAnchorElement> }> = ({
  download,
  rel,
  target,
  ...props
}) => (
  <LinkRoot
    hrefAttrs={{
      download,
      rel,
      target,
    }}
    role="link"
    {...props}
  />
);

Link.displayName = 'Link';
