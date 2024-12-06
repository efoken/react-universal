import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    conditions: ['source'],
  },
  define: {
    'process.env': process.env,
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: 'chromium',
      provider: 'playwright',
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
