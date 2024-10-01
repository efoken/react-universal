import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    { directory: '../packages/core/src' },
    { directory: '../packages/components/src' },
    { directory: '../packages/svg/src' },
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-shadow
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        conditions: ['source'],
      },
    }),
};

export default config;
