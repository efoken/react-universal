import { ThemeProvider } from '@react-universal/core';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider>
        <Story {...context} />
      </ThemeProvider>
    ),
  ],
};

export default preview;
