import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta = {
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'White RV trailer on grass field near trees under cloudy sky',
    src: 'https://images.unsplash.com/photo-1497492969993-1a263dc62b1a?q=80&w=600&auto=format',
    sx: {
      w: 300,
    },
  },
};
