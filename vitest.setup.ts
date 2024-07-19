import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { defaultTheme } from '@universal-ui/core';
import { afterEach, beforeAll, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

function useTheme() {
  return defaultTheme;
}

beforeAll(() => {
  vi.mock('./packages/core/src/contexts/ThemeContext', async (importOriginal) => {
    const { ThemeProvider } =
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
      await importOriginal<typeof import('./packages/core/src/contexts/ThemeContext')>();
    return {
      ThemeProvider,
      useTheme,
    };
  });
});
