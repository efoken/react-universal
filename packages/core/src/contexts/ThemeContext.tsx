'use client';

import { Global } from '@emotion/react';
import { createContext, useContext } from 'react';
import type { Theme } from '../theme/defaultTheme';
import { defaultTheme } from '../theme/defaultTheme';
import type { ThemeProviderProps } from './ThemeContext.types';

const ThemeContext = createContext<Theme>(undefined as any);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = defaultTheme }) => (
  <ThemeContext.Provider value={theme}>
    <Global
      styles={{
        '*': {
          font: 'inherit',
          margin: 0,
          padding: 0,
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        body: {
          minHeight: '100dvh',
          position: 'relative',
        },
        'ol, ul': {
          listStyleType: 'none',
        },
        a: {
          color: 'inherit',
          textDecoration: 'inherit',
        },
      }}
    />
    {children}
  </ThemeContext.Provider>
);

export function useTheme() {
  return useContext(ThemeContext);
}
