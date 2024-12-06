'use client';

import { Stack, Text } from '@react-universal/components';
import { css, styled } from '@react-universal/core';
import type { SxProps } from '@react-universal/core';
import { Nav } from '@react-universal/elements';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { useEffect } from 'react';
import { scrollIntoView } from '../lib/scrollIntoView';
import { useScrollSpy } from '../lib/useScrollSpy';

interface TocItem {
  title: React.ReactNode;
  url: string;
  depth: number;
}

interface TocProps {
  items: TocItem[];
}

const TocLink = styled(
  ({
    className,
    style,
    ...props
  }: {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    sx?: SxProps;
  } & LinkProps) => <Link {...css.props(style)} {...props} />,
  {
    name: 'Toc',
    slot: 'Link',
  },
)(({ theme }) => ({
  color: theme.colors.text.muted,
  fontSize: '0.875rem',
  marginInlineStart: 'calc(1rem * var(--toc-depth))',
  '&[aria-current="page"]': {
    color: theme.colors.text.default,
    fontWeight: 700,
  },
  '&:hover': {
    color: theme.colors.text.default,
  },
}));

export const Toc: React.FC<TocProps> = ({ items }) => {
  const activeItem = useScrollSpy(items.map((entry) => entry.url));

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const activeLink = document.querySelector<HTMLElement>('[data-toc][aria-current="page"]');
    const toc = document.getElementById('toc');
    if (toc && activeLink) {
      scrollIntoView(toc, activeLink, 120);
    }
  }, [activeItem]);

  if (items.length === 0) {
    return <div />;
  }

  return (
    <Nav sx={{ fontSize: '0.875rem' }}>
      <Text sx={{ fontWeight: 600 }}>On this page</Text>
      <Stack sx={{ mt: 3 }}>
        {items.map((item, index) => (
          <TocLink
            // biome-ignore lint/suspicious/noArrayIndexKey:
            key={index}
            data-toc
            aria-current={item.url === activeItem ? 'page' : undefined}
            href={item.url}
            id={item.url}
            sx={{
              '--toc-depth': item.depth,
            }}
          >
            {item.title}
          </TocLink>
        ))}
      </Stack>
    </Nav>
  );
};
