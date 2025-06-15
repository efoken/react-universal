import { UniversalProvider } from '@react-universal/core';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

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
