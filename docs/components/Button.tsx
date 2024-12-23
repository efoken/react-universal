'use client';

import { Button as ButtonRoot } from '@react-universal/components';
import type { ButtonProps } from '@react-universal/components';
import { useCallback, useState } from 'react';
import type { MouseEvent } from 'react-native';

export const Button: React.FC<ButtonProps> = ({ onHoverIn, onHoverOut, sx, ...props }) => {
  const [hovered, setHovered] = useState(false);

  const handleHoverIn = useCallback(
    (event: MouseEvent) => {
      onHoverIn?.(event);
      setHovered(true);
    },
    [onHoverIn],
  );

  const handleHoverOut = useCallback(
    (event: MouseEvent) => {
      onHoverOut?.(event);
      setHovered(false);
    },
    [onHoverOut],
  );

  return (
    <ButtonRoot
      sx={{
        alignItems: 'center',
        backgroundColor: hovered ? 'background.muted' : 'transparent',
        borderRadius: 4,
        borderWidth: 0,
        justifyContent: 'center',
        ...sx,
      }}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      {...props}
    />
  );
};
