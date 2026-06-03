import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarMenu } from './AvatarMenu';

const meta = {
  title: 'app/AvatarMenu',
  component: AvatarMenu,
  tags: ['autodocs'],
  args: {
    initial: '인',
  },
  argTypes: {
    initial: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Account menu shown in the header. Click the avatar to toggle the ' +
          'dropdown; clicking outside closes it. The dropdown is anchored to ' +
          'the avatar, so the decorator right-aligns it and reserves vertical ' +
          'room for the open state.',
      },
    },
  },
  // Mirror the header placement (right-aligned) and leave room for the
  // absolutely-positioned dropdown to open beneath the avatar.
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          minHeight: 240,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
