import { reactUniversal } from '@react-universal/vite-plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    { directory: '../packages/core/src' },
    { directory: '../packages/components/src' },
    { directory: '../packages/svg/src' },
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [reactUniversal()],
      resolve: {
        conditions: ['source'],
      },
    }),
};

export default config;
