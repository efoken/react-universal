'use client';

import type { ViewProps } from '@react-universal/components';
import { Stack } from '@react-universal/components';
import { Aside } from '@react-universal/elements';
import { useRef } from 'react';
import { SideNav } from '#/components/SideNav';
import { useRoute } from '#/lib/useRoute';
import { useScrollIntoView } from '#/lib/useScrollIntoView';

export const SidebarStart: React.FC<ViewProps> = (props) => {
  const containerRef = useRef<React.ComponentRef<typeof Aside>>(null);
  const route = useRoute();

  useScrollIntoView(containerRef, '[aria-current="page"]', 'center');

  return (
    <Aside
      ref={containerRef}
      sx={{
        display: { xs: 'none', md: 'block' },
        flexShrink: 0,
        fontSize: '0.875rem',
        height: 'var(--content-height)',
        ms: '-3',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        pe: '5',
        position: 'sticky' as any,
        py: '10',
        top: 'var(--header-height)',
        width: '16rem',
      }}
      {...props}
    >
      <Stack spacing={6}>
        {route.getSidebarNavItems().map((group) => (
          <SideNav
            key={group.title}
            currentUrl={route.currentUrl}
            title={group.title}
            items={group.items}
            status={group.status}
          />
        ))}
      </Stack>
    </Aside>
  );
};

export const SidebarEnd: React.FC<ViewProps> = ({ children, sx, ...props }) => (
  <Aside
    as="aside"
    sx={{
      display: { xs: 'none', xl: 'block' },
      flexShrink: 0,
      height: 'var(--content-height)',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      pb: '10',
      position: 'sticky' as any,
      pt: '10',
      px: '2',
      top: 'var(--header-height)',
      w: '16rem',
      ...sx,
    }}
    {...props}
  >
    <Stack sx={{ alignItems: 'flex-start', gap: 4 }}>{children}</Stack>
  </Aside>
);
