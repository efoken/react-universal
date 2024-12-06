import { Box } from '@react-universal/components';
import type { BoxProps } from '@react-universal/components';
import type { Code } from '@react-universal/elements';
import { cloneElement, isValidElement } from 'react';

export const Pre: React.FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      as="pre"
      {...props}
      sx={{
        bgColor: 'background.muted',
        borderRadius: '0.375rem',
        boxShadow: 'none',
        fontSize: '0.9em',
        fontWeight: 400,
        mb: '1.6em',
        mt: '1.6em',
        overflowX: 'auto',
        px: '2em',
        py: '2em',
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
    </Box>
  );
};
