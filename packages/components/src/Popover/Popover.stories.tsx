import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Button } from '../Button';
import { Text } from '../Text';
import { Popover } from './Popover';

const meta = {
  component: Popover,
  argTypes: {
    placement: {
      control: 'radio',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
    },
    strategy: {
      control: 'radio',
      options: ['absolute', 'fixed'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ id: idProp, ...args }) => {
    const [anchor, setAnchor] = useState<HTMLElement>();

    const handlePress = (event: GestureResponderEvent) => {
      setAnchor(anchor ? undefined : (event.currentTarget as unknown as HTMLElement));
    };

    const open = anchor != null;
    const id = open ? idProp : undefined;

    return (
      <>
        <Button aria-describedby={id} type="button" onPress={handlePress}>
          <Text>Toggle Popup</Text>
        </Button>
        <Popover {...args} anchor={anchor} id={id} open={open} />
      </>
    );
  },
  args: {
    children: <Text>The content of the Popover.</Text>,
    id: 'default-popover',
    open: false,
    placement: 'bottom',
    strategy: 'absolute',
  },
};
