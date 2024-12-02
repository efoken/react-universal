import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Button } from '../Button';
import { Text } from '../Text';
import { Popover } from './Popover';

const meta = {
  component: Popover,
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
  },
};
