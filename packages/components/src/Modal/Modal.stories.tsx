import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Modal } from './Modal';

const meta = {
  component: Modal,
  args: {
    children: undefined as unknown as React.ReactElement,
    open: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onPress={handleOpen}>
          <Text>Open modal</Text>
        </Button>
        <Modal {...args} open={open} onClose={handleClose}>
          <Stack
            sx={{
              bgColor: 'white',
              borderWidth: 2,
              left: '50%',
              p: 4,
              position: 'absolute',
              top: '50%',
              w: 400,
            }}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Heading sx={{ mb: 4 }}>Text in a modal</Heading>
            <Text role="paragraph">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Text>
          </Stack>
        </Modal>
      </>
    );
  },
};

export const Nested: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [openChild, setOpenChild] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenChild = () => setOpenChild(true);
    const handleCloseChild = () => setOpenChild(false);

    return (
      <>
        <Button onPress={handleOpen}>
          <Text>Open modal</Text>
        </Button>
        <Modal
          {...args}
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          onClose={handleClose}
        >
          <Stack
            sx={{
              bgColor: 'white',
              borderWidth: 2,
              left: '50%',
              pb: 3,
              position: 'absolute',
              pt: 2,
              px: 4,
              top: '50%',
              w: 400,
            }}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Heading id="parent-modal-title" sx={{ mb: 4 }}>
              Text in a modal
            </Heading>
            <Text id="parent-modal-description" role="paragraph" sx={{ mb: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Text>
            <Button onPress={handleOpenChild}>
              <Text>Open child modal</Text>
            </Button>
            <Modal
              {...args}
              hideBackdrop
              open={openChild}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              onClose={handleCloseChild}
            >
              <Stack
                sx={{
                  bgColor: 'white',
                  borderWidth: 2,
                  left: '50%',
                  pb: 3,
                  position: 'absolute',
                  pt: 2,
                  px: 4,
                  top: '50%',
                  w: 200,
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Heading id="child-modal-title" sx={{ mb: 4 }}>
                  Text in a child modal
                </Heading>
                <Text id="child-modal-description" role="paragraph" sx={{ mb: 2 }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </Text>
                <Button onPress={handleCloseChild}>
                  <Text>Close child modal</Text>
                </Button>
              </Stack>
            </Modal>
          </Stack>
        </Modal>
      </>
    );
  },
};
