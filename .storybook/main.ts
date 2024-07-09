import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [{ directory: '../packages/core/src' }, { directory: '../packages/components/src' }],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
};

export default config;
