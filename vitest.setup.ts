import type { ThemeProvider as ThemeProviderType } from '@react-universal/core';
import { defaultTheme } from '@react-universal/core';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

function useTheme() {
  return defaultTheme;
}

beforeAll(() => {
  vi.mock('./packages/core/src/contexts/ThemeContext', async (importOriginal) => {
    const { ThemeProvider } = await importOriginal<{ ThemeProvider: typeof ThemeProviderType }>();
    return {
      ThemeProvider,
      useTheme,
    };
  });
});
