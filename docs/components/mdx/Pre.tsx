import type { ViewProps } from '@react-universal/components';
import { Pre as PreRoot } from '@react-universal/elements';
import type { Code } from '@react-universal/elements';
import { cloneElement, isValidElement } from 'react';

export const Pre: React.FC<ViewProps> = ({ children, sx, ...props }) => (
  <PreRoot
    {...props}
    sx={{
      bgColor: 'background.muted',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      fontSize: '0.875rem',
      fontWeight: 400,
      mb: 6,
      mt: 6,
      overflowX: 'auto',
      px: 7,
      py: 7,
      ...sx,
    }}
  >
    {isValidElement<React.ComponentProps<typeof Code>>(children)
      ? cloneElement(children, {
          sx: {
            bgColor: 'transparent',
            borderWidth: 'inherit' as any,
            fontSize: 'inherit',
            letterSpacing: 'inherit' as any,
            p: 0,
          },
        })
      : children}
  </PreRoot>
);
