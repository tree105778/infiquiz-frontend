import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuizHeader } from './QuizHeader';

// Stand-in topic for the centered label; shape matches the `topic` the quiz
// page threads in from TOPICS.
const sampleTopic = { emoji: '🧠', nameKo: '뇌과학' };

const meta = {
  title: 'app/QuizHeader',
  component: QuizHeader,
  tags: ['autodocs'],
  // Sticky, full-bleed bar — render it edge to edge.
  parameters: { layout: 'fullscreen' },
  args: {
    topic: sampleTopic,
    elapsedSeconds: 92,
    onExit: () => {},
  },
  argTypes: {
    onExit: { control: false },
  },
} satisfies Meta<typeof QuizHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

// Fixed session, mid-session: question 3 of 10, progress bar at 20%.
export const Fixed: Story = {
  args: { questionIndex: 2, total: 10, answered: false },
};

// Fixed session feedback phase: the current question is graded, so the counter
// reads 3/10 and the bar advances to include it (30%).
export const FixedAnswered: Story = {
  args: { questionIndex: 2, total: 10, answered: true },
};

// Endless practice — no `total`, so the counter shows "N문제 풀이 중" and there
// is no progress bar.
export const Practice: Story = {
  args: { questionIndex: 6 },
};

// Timer hidden — `elapsedSeconds` omitted, so no ⏱ block renders.
export const NoTimer: Story = {
  args: { questionIndex: 2, total: 10, elapsedSeconds: undefined },
};
