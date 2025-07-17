'use client';

import { Stack, Text } from '@react-universal/components';
import { styled } from '@react-universal/core';
import { Nav } from '@react-universal/elements';
import { Link } from '@react-universal/next';
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

const TocLink = styled(Link)(({ theme }) => ({
  color: theme.colors.text.muted,
  fontSize: '0.875rem',
  marginInlineStart: 'calc(1rem * var(--toc-depth))',
  '&:hover': {
    color: theme.colors.text.default,
  },
  variants: {
    'aria-current': {
      page: {
        color: theme.colors.text.default,
        fontWeight: 500,
      },
    },
  },
}));

export const Toc: React.FC<TocProps> = ({ items }) => {
  const activeItem = useScrollSpy(items.map((entry) => entry.url));

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to run this effect when the activeItem changes
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
      <Stack sx={{ gap: '2', mt: '3' }}>
        {items.map((item) => (
          <TocLink
            key={item.url}
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
