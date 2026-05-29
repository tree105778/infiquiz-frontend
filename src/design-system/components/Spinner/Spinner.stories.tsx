import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'lg'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="lg" />
    </div>
  ),
};

export const InheritsColor: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <span style={{ color: '#4f46e5' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: '#16a34a' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: '#dc2626' }}>
        <Spinner {...args} />
      </span>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: (args) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Spinner {...args} />
      퀴즈를 불러오는 중...
    </span>
  ),
};

export const OnDark: Story = {
  globals: { backgrounds: { value: 'brandDark' } },
  render: (args) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: '#ffffff',
      }}
    >
      <Spinner {...args} />
      Loading
    </span>
  ),
};
