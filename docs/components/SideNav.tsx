import { Stack } from '@react-universal/components';
import { styled } from '@react-universal/core';
import { Span } from '@react-universal/elements';
import { Link } from '@react-universal/next';
import type { LinkProps } from 'next/link';

interface SideNavItem {
  title: React.ReactNode;
  url: LinkProps['href'] | undefined;
  external?: boolean;
  status?: string;
}

interface SideNavProps {
  currentUrl?: string;
  title?: React.ReactNode;
  status?: string;
  items: SideNavItem[];
}

const SideNavLink = styled(Link)(({ theme }) => ({
  borderRadius: '0.375rem',
  color: 'text.muted',
  display: 'flex',
  flexDirection: 'row',
  paddingBlock: theme.space[2],
  paddingInlineEnd: theme.space[3],
  paddingInlineStart: theme.space[4],
  '&:hover': {
    backgroundColor: theme.colors.background.muted,
  },
  variants: {
    'aria-current': {
      page: {
        color: 'text.default',
        backgroundColor: theme.colors.background.muted,
        fontWeight: 500,
      },
    },
  },
}));

export const SideNav: React.FC<SideNavProps> = ({ title, items, currentUrl, status }) => (
  <Stack spacing={2}>
    {title && (
      <Stack direction="row" sx={{ ps: '4', fontWeight: 600 }}>
        <Span>{title}</Span>
        {status}
      </Stack>
    )}
    <Stack spacing="px">
      {items.map((item, index) => (
        <SideNavLink
          key={item.url?.toString() ?? index}
          aria-current={item.url === currentUrl ? 'page' : undefined}
          href={item.url!}
        >
          <Span>{item.title}</Span>
          {item.status}
        </SideNavLink>
      ))}
    </Stack>
  </Stack>
);
