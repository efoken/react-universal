import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Container } from './Container';

const meta = {
  component: Container,
  argTypes: {
    maxWidth: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', false],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Box sx={{ bgColor: '#cfe8fc', height: '100vh' }} />,
    maxWidth: 'sm',
  },
};

export const Fixed: Story = {
  args: {
    children: <Box sx={{ bgColor: '#cfe8fc', height: '100vh' }} />,
    fixed: true,
  },
};
