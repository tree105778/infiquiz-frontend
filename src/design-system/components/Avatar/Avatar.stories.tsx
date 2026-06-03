import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    initial: '인',
    size: 32,
    disabled: false,
  },
  argTypes: {
    initial: { control: 'text' },
    size: { control: { type: 'number', min: 16, max: 96, step: 4 } },
    disabled: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

// Avatar text uses `color: onPrimary` (white) with no background fill, so
// initials are only legible on a dark surface. The brand-dark background
// mirrors how a consumer would place it on a colored container.
export const Playground: Story = {
  globals: { backgrounds: { value: 'brandDark' } },
};

export const Sizes: Story = {
  globals: { backgrounds: { value: 'brandDark' } },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Avatar {...args} size={24} initial="인" />
      <Avatar {...args} size={32} initial="피" />
      <Avatar {...args} size={48} initial="퀴" />
      <Avatar {...args} size={64} initial="즈" />
    </div>
  ),
};

export const Initials: Story = {
  globals: { backgrounds: { value: 'brandDark' } },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Avatar {...args} initial="배" />
      <Avatar {...args} initial="JY" />
      <Avatar {...args} initial="Q" />
      <Avatar {...args} initial="인" />
    </div>
  ),
};

// `children` overrides `initial`. Emoji glyphs carry their own color, so they
// stay visible on the default white canvas regardless of the white text color.
export const WithChildren: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Avatar {...args} size={48}>
        🦊
      </Avatar>
      <Avatar {...args} size={48}>
        🎯
      </Avatar>
      <Avatar {...args} size={48}>
        🏆
      </Avatar>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  globals: { backgrounds: { value: 'brandDark' } },
};
