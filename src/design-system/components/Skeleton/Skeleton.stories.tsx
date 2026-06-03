import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    width: 320,
    height: 20,
  },
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    radius: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Skeleton {...args} width={240} height={16} />
      <Skeleton {...args} width={120} height={120} radius={12} />
      <Skeleton {...args} width={48} height={48} radius="50%" />
    </div>
  ),
};

export const TextLines: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton {...args} width="100%" height={16} />
      <Skeleton {...args} width="90%" height={16} />
      <Skeleton {...args} width="70%" height={16} />
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Circle: Story = {
  args: { width: 56, height: 56, radius: '50%' },
};

export const LoadingCard: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 360,
        padding: 20,
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width={48} height={48} radius="50%" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton width={140} height={14} />
          <Skeleton width={90} height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={160} radius={12} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton width="100%" height={14} />
        <Skeleton width="80%" height={14} />
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
