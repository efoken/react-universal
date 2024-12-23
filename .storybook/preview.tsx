import { UniversalProvider } from '@react-universal/core';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story, context) => (
      <UniversalProvider>
        <Story {...context} />
      </UniversalProvider>
    ),
  ],
};

export default preview;
