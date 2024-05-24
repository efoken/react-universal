'use client';

import { createContext, useContext } from 'react';
import { defaultTheme, type Theme } from '../theme/defaultTheme';
import type { ThemeProviderProps } from './ThemeContext.types';

const ThemeContext = createContext<Theme>(undefined as any);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultTheme,
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export function useTheme() {
  return useContext(ThemeContext);
}
