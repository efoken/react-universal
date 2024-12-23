'use client';

import { Box, Show } from '@react-universal/components';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Button } from './Button';

export const ColorModeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePress = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Show when={mounted} fallback={<Box sx={{ h: '2.25rem', w: '2.25rem' }} />}>
      <Button sx={{ h: '2.25rem', w: '2.25rem' }} onPress={handlePress}>
        {theme === 'light' ? <LuSun /> : <LuMoon />}
      </Button>
    </Show>
  );
};
