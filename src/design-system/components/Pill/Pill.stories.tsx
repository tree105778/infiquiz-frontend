import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill } from './Pill';

const meta = {
  title: 'components/Pill',
  component: Pill,
  tags: ['autodocs'],
  args: {
    children: 'New',
    tone: 'default',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['default', 'cream', 'hairline'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Pill {...args} tone="default">
        New
      </Pill>
      <Pill {...args} tone="cream">
        Pro
      </Pill>
      <Pill {...args} tone="hairline">
        Beta
      </Pill>
    </div>
  ),
};

export const QuizLabels: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Pill {...args} tone="default">
        퀴즈 10문항
      </Pill>
      <Pill {...args} tone="cream">
        인기
      </Pill>
      <Pill {...args} tone="hairline">
        초급
      </Pill>
    </div>
  ),
};
