'use client';

import { Box, Container, Spacer, Stack } from '@react-universal/components';
import { styled } from '@react-universal/core';
import { Link } from '@react-universal/next';
import docsConfig from '#/docs.config';
import { useRoute } from '#/lib/useRoute';
import { ColorModeButton } from './ColorModeButton';
import { SocialLinks } from './SocialLinks';

const HeaderRoot = styled('header')(({ theme }) => ({
  alignItems: 'center',
  backdropFilter: 'saturate(180%) blur(5px)',
  backgroundColor: `color-mix(in srgb, ${theme.colors.background.default} 90%, transparent 10%)`,
  borderBottomColor: theme.colors.border.muted,
  borderBottomWidth: 1,
  display: 'flex',
  minHeight: '4rem',
  position: 'sticky' as any,
  top: 0,
  width: '100%',
  zIndex: 10,
}));

const HeaderLogoLink: React.FC = () => (
  <Link
    href="/"
    aria-label="Chakra UI, Back to homepage"
    sx={{ fontSize: '1.5rem', fontWeight: 700 }}
  >
    🪐 React Universal
  </Link>
);

const HeaderSocialLinks: React.FC = () => (
  <SocialLinks items={[{ type: 'github', href: docsConfig.repoUrl }]} />
);

const HeaderPrimaryNavbarLink = styled(Link)(({ theme }) => ({
  color: theme.colors.text.muted,
  fontSize: 14,
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

const HeaderPrimaryNavbar: React.FC = () => {
  const route = useRoute();

  return (
    <Stack direction="row" sx={{ gap: '8', minH: '3rem' }} aria-label="primary navigation">
      <HeaderLogoLink />
      {route.getPrimaryNavItems().map((item) => (
        <HeaderPrimaryNavbarLink
          key={item.title}
          href={item.url || '#'}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.title}
        </HeaderPrimaryNavbarLink>
      ))}
    </Stack>
  );
};

const HeaderDesktopNavbarActions: React.FC = () => (
  <Stack direction="row" sx={{ flexShrink: 1, gap: '2', minH: '3rem', minW: 0 }}>
    {/* <CommandMenu trigger={<SearchButton width="256px" size="sm" flexShrink="1" />} /> */}
    <HeaderSocialLinks />
    <ColorModeButton />
  </Stack>
);

const HeaderDesktopNavbar: React.FC = () => (
  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
    <Stack direction="row" sx={{ py: '2' }}>
      <HeaderPrimaryNavbar />
      <Spacer />
      <HeaderDesktopNavbarActions />
    </Stack>
    {/* <HeaderSecondaryNavbar /> */}
  </Box>
);

export const Header: React.FC = () => (
  <HeaderRoot>
    <Container maxWidth="xl">
      <HeaderDesktopNavbar />
      {/* <HeaderMobileNavbar /> */}
    </Container>
  </HeaderRoot>
);
