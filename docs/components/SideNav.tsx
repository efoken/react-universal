import { Stack } from '@react-universal/components';
import { styled } from '@react-universal/core';
import { Span } from '@react-universal/elements';
import Link from 'next/link';
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

const SideNavLink = styled(Stack)(({ theme }) => ({
  borderRadius: '0.375rem',
  color: 'text.muted',
  paddingBlock: theme.space[2],
  paddingInlineEnd: theme.space[3],
  paddingInlineStart: theme.space[4],
  '&:hover': {
    backgroundColor: theme.colors.background.muted,
  },
  variants: [
    {
      props: { 'aria-current': 'page' as any },
      style: {
        color: 'text.default',
        backgroundColor: theme.colors.background.muted,
        fontWeight: 500,
      },
    },
  ],
}));

export const SideNav: React.FC<SideNavProps> = ({ title, items, currentUrl, status }) => (
  <Stack spacing={2}>
    {title && (
      <Stack direction="row" sx={{ ps: 4, fontWeight: 600 }}>
        <Span>{title}</Span>
        {status}
      </Stack>
    )}
    <Stack spacing="px">
      {items.map((item, index) => (
        <Link
          // biome-ignore lint/suspicious/noArrayIndexKey:
          key={index}
          legacyBehavior
          passHref
          href={item.url!}
        >
          <SideNavLink aria-current={item.url === currentUrl ? 'page' : undefined} direction="row">
            <Span>{item.title}</Span>
            {item.status}
          </SideNavLink>
        </Link>
      ))}
    </Stack>
  </Stack>
);
