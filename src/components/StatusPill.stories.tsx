import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusPill } from './StatusPill';

const meta = {
  title: 'app/StatusPill',
  component: StatusPill,
  tags: ['autodocs'],
  args: {
    status: 'in_progress',
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['completed', 'in_progress', 'abandoned'],
    },
  },
} satisfies Meta<typeof StatusPill>;

export default meta;

type Story = StoryObj<typeof meta>;

// `completed` renders nothing — the design only labels in-progress and
// abandoned runs — so the canvas is intentionally empty for that option.
export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <StatusPill status="in_progress" />
      <StatusPill status="abandoned" />
    </div>
  ),
};
