import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';
import type { ToastKind } from './Toast.css';

type ToastDemoProps = {
  message: string;
  kind: ToastKind;
  ms: number;
};

function ToastDemo({ message, kind, ms }: ToastDemoProps) {
  const { push } = useToast();
  return (
    <button
      type="button"
      onClick={() => push({ message, kind, ms })}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        border: '1px solid var(--color-line)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      토스트 띄우기
    </button>
  );
}

const meta = {
  title: 'components/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  args: {
    message: '퀴즈가 저장되었어요.',
    kind: 'info',
    ms: 5000,
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['info', 'success', 'error'],
    },
    message: { control: 'text' },
    ms: { control: 'number' },
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Info: Story = {
  args: {
    kind: 'info',
    message: '새 문제가 추가되었어요.',
  },
};

export const Success: Story = {
  args: {
    kind: 'success',
    message: '퀴즈 결과가 성공적으로 제출됐어요!',
  },
};

export const ErrorKind: Story = {
  args: {
    kind: 'error',
    message: '제출에 실패했어요. 다시 시도해 주세요.',
  },
};

function KindTrigger({ kind, label }: { kind: ToastKind; label: string }) {
  const { push } = useToast();
  const messages: Record<ToastKind, string> = {
    info: '곧 퀴즈가 시작돼요.',
    success: '정답입니다! 점수가 반영됐어요.',
    error: '시간이 초과됐어요.',
  };
  return (
    <button
      type="button"
      onClick={() => push({ message: messages[kind], kind, ms: 5000 })}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        border: '1px solid var(--color-line)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      {label}
    </button>
  );
}

export const Kinds: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <KindTrigger kind="info" label="Info" />
      <KindTrigger kind="success" label="Success" />
      <KindTrigger kind="error" label="Error" />
    </div>
  ),
};
