import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBlur: action('onBlur'),
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    sx: {
      borderRadius: 2,
      borderWidth: 1,
      p: 1,
    },
  },
};
