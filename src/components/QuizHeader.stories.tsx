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
    mode: { control: 'inline-radio', options: ['fixed', 'practice'] },
    onExit: { control: false },
  },
} satisfies Meta<typeof QuizHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

// 도전 모드, mid-session: question 3 of 10, progress bar at 20%.
export const Fixed: Story = {
  args: { mode: 'fixed', questionIndex: 2, total: 10, answered: false },
};

// 도전 모드 feedback phase: the current question is graded, so the counter
// reads 3/10 and the bar advances to include it (30%).
export const FixedAnswered: Story = {
  args: { mode: 'fixed', questionIndex: 2, total: 10, answered: true },
};

// 연습 모드: endless practice — counter shows "N문제 풀이 중", no progress bar.
export const Practice: Story = {
  args: { mode: 'practice', questionIndex: 6 },
};
