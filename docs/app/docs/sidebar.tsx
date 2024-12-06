import type { BoxProps } from '@react-universal/components';
import { Stack } from '@react-universal/components';
import { Aside } from '@react-universal/elements';

export const SidebarEnd: React.FC<BoxProps> = ({ children, sx, ...props }) => (
  <Aside
    as="aside"
    sx={{
      display: { xs: 'none', xl: 'block' },
      flexShrink: 0,
      height: 'var(--content-height)',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      pb: 8,
      position: 'sticky' as any,
      pt: 8,
      px: 2,
      top: 'var(--header-height)',
      w: '16rem',
      ...sx,
    }}
    {...props}
  >
    <Stack sx={{ alignItems: 'flex-start', gap: 4 }}>{children}</Stack>
  </Aside>
);
