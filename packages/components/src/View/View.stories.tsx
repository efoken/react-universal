import type { Meta, StoryObj } from '@storybook/react';
import { View } from './View';

const meta = {
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PropAriaLabel: Story = {
  name: 'Prop "aria-label"',
  args: {
    'aria-label': 'accessibility label',
  },
};

export const PropAriaLabelledBy: Story = {
  name: 'Prop "aria-labelledby"',
  args: {
    'aria-labelledby': '123',
  },
};

export const PropAriaLive: Story = {
  name: 'Prop "aria-live"',
  args: {
    'aria-live': 'polite',
  },
};

export const PropRole: Story = {
  name: 'Prop "role"',
  args: {
    role: 'presentation',
  },
};

export const PropDir: Story = {
  name: 'Prop "dir"',
  args: {
    dir: 'ltr',
  },
};

export const PropHref: Story = {
  name: 'Prop "href"',
  args: {
    href: 'https://example.com',
  },
};

export const PropHrefAttrs: Story = {
  name: 'Prop "hrefAttrs"',
  args: {
    href: 'https://example.com',
    hrefAttrs: {
      download: 'filename.jpg',
      rel: 'nofollow',
      target: '_blank',
    },
  },
};

export const PropLang: Story = {
  name: 'Prop "lang"',
  args: {
    lang: 'fr',
  },
};

export const PropId: Story = {
  name: 'Prop "id"',
  args: {
    id: 'ID',
  },
};

export const PropStyle: Story = {
  name: 'Prop "style"',
  args: {
    style: { borderWidth: 5 },
  },
};

export const PropTestId: Story = {
  name: 'Prop "testID"',
  args: {
    testID: '123',
  },
};
