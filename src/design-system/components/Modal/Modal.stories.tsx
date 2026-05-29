import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    // `children` is required by Modal; the trigger-pattern stories render
    // their own content and `AlwaysOpen` overrides this, so a null default
    // just satisfies the required-args type.
    children: null,
    open: true,
    width: 480,
  },
  argTypes: {
    open: { control: 'boolean' },
    width: { control: 'number' },
    onClose: { action: 'close' },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const footerStyle = {
  display: 'flex',
  gap: 12,
  justifyContent: 'flex-end',
  marginTop: 24,
};

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        {open && (
          <Modal {...args} open={open} onClose={() => setOpen(false)}>
            <Text as="h2" variant="headingSm" tone="ink">
              퀴즈를 시작할까요?
            </Text>
            <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 8 }}>
              총 10문항이며, 제한 시간은 5분입니다. 준비되면 시작 버튼을
              눌러주세요.
            </Text>
            <div style={footerStyle}>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>시작하기</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button variant="secondary" onClick={() => setOpen(true)}>
          퀴즈 삭제
        </Button>
        {open && (
          <Modal open={open} onClose={() => setOpen(false)} width={400}>
            <Text as="h2" variant="headingSm" tone="ink">
              정말 삭제하시겠어요?
            </Text>
            <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 8 }}>
              삭제한 퀴즈와 응시 기록은 복구할 수 없습니다.
            </Text>
            <div style={footerStyle}>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>삭제</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const QuizResult: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setOpen(true)}>결과 보기</Button>
        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <Text variant="microCap" tone="primary">
              인피퀴즈 리포트
            </Text>
            <Text
              as="h2"
              variant="displayMd"
              tone="ink"
              style={{ marginTop: 8 }}
            >
              92점
            </Text>
            <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 8 }}>
              10문항 중 9문항을 맞혔어요. 상위 8%의 성적입니다.
            </Text>
            <div style={footerStyle}>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                닫기
              </Button>
              <Button onClick={() => setOpen(false)}>다시 풀기</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const WideWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setOpen(true)}>넓은 모달 열기</Button>
        {open && (
          <Modal open={open} onClose={() => setOpen(false)} width={680}>
            <Text as="h2" variant="headingMd" tone="ink">
              문항 미리보기
            </Text>
            <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 8 }}>
              width 값을 키우면 넓은 레이아웃의 다이얼로그를 만들 수 있습니다.
              표나 긴 문항 본문을 보여줄 때 유용합니다.
            </Text>
            <div style={footerStyle}>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const AlwaysOpen: Story = {
  // Excluded from the stacked autodocs page: an always-open `position: fixed`
  // overlay renders broken inside a docs story block. Still available in the
  // sidebar as its own story for tweaking controls live.
  tags: ['!autodocs'],
  args: {
    children: (
      <>
        <Text as="h2" variant="headingSm" tone="ink">
          항상 열려 있는 모달
        </Text>
        <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 8 }}>
          이 스토리는 컨트롤(width 등)을 직접 조정해 볼 수 있도록 모달을 열어
          둡니다. 오버레이를 클릭하거나 Esc 키를 누르면 onClose가 호출됩니다.
        </Text>
      </>
    ),
  },
};
