import type { TextProps } from '@react-universal/components';
import { Code as CodeRoot } from '@react-universal/elements';

export const Code: React.FC<TextProps> = ({ sx, ...props }) => (
  <CodeRoot
    {...props}
    sx={{
      bgColor: 'background.muted',
      borderRadius: '0.375rem',
      borderWidth: 0.5,
      color: 'fg',
      fontSize: '0.8em',
      letterSpacing: '-0.01em',
      px: '0.4em',
      py: '0.1em',
      whiteSpace: 'pre',
      ...sx,
    }}
  />
);
