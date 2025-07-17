import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text>Button</Text>,
    disabled: false,
    sx: {
      bgColor: 'background.default',
      borderRadius: 2,
      p: '1',
    },
  },
};
